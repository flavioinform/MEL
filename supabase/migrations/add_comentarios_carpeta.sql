-- Crear tabla de comentarios por carpeta
CREATE TABLE IF NOT EXISTS comentarios_carpeta (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  empresa_id UUID NOT NULL REFERENCES empresas(id) ON DELETE CASCADE,
  carpeta_tipo_id INTEGER NOT NULL REFERENCES carpetas_tipo(id) ON DELETE CASCADE,
  comentario TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by UUID REFERENCES empresas(id) ON DELETE SET NULL,
  UNIQUE(empresa_id, carpeta_tipo_id)
);

-- Habilitar RLS
ALTER TABLE comentarios_carpeta ENABLE ROW LEVEL SECURITY;

-- Política: Usuarios pueden ver comentarios de su propia empresa
CREATE POLICY "Users can view their own folder comments"
  ON comentarios_carpeta FOR SELECT
  USING (
    empresa_id IN (
      SELECT id FROM empresas WHERE auth_usuario_id = auth.uid()
    )
  );

-- Política: Admins pueden gestionar todos los comentarios
CREATE POLICY "Admins can manage all comments"
  ON comentarios_carpeta FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM empresas 
      WHERE auth_usuario_id = auth.uid() 
      AND rol = 'administrador'
    )
  );

-- Función para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger para actualizar updated_at
CREATE TRIGGER update_comentarios_carpeta_updated_at 
  BEFORE UPDATE ON comentarios_carpeta 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();
