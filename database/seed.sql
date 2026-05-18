-- ============================================
-- VARIUM - Datos de prueba iniciales (Seed)
-- ============================================

USE vivero_shop;

INSERT INTO productos (nombre, categoria, precio, descripcion, emoji, stock) VALUES
('Monstera Deliciosa',     'Interior', 45000, 'Planta tropical de gran tamaño, perfecta para interiores luminosos. Sus hojas perforadas la hacen única.',          '🌿', 15),
('Cactus San Pedro',       'Exterior', 28000, 'Cactus resistente y de bajo mantenimiento, ideal para jardines soleados. Requiere muy poca agua.',                  '🌵', 20),
('Orquídea Phalaenopsis',  'Flores',   65000, 'Elegante flor con una floración duradera. Sus colores vibrantes decoran cualquier espacio con sofisticación.',      '🌸', 10),
('Pothos Dorado',          'Interior', 18000, 'Planta colgante de fácil cuidado que purifica el aire del hogar. Perfecta para principiantes.',                     '🍃', 25),
('Lavanda Francesa',       'Flores',   22000, 'Aromática y hermosa, perfecta para jardines y balcones. Su fragancia relaja y ahuyenta insectos.',                  '💜', 18),
('Bambú de la Suerte',     'Interior', 35000, 'Símbolo de buena fortuna según el feng shui. Requiere poca luz y agua, ideal para oficinas y hogares.',             '🎋', 12),
('Rosa Roja',              'Flores',   30000, 'La reina de las flores. Su fragancia y color rojo intenso la convierten en el regalo perfecto.',                    '🌹', 20);
