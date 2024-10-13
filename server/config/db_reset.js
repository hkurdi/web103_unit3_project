import pool from './db.js';

const createTables = async () => {
  try {
    await pool.query('DROP TABLE IF EXISTS events;');
    await pool.query('DROP TABLE IF EXISTS locations;');

    await pool.query(`
      CREATE TABLE locations (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        address VARCHAR(255),
        description TEXT,
        image TEXT
      );
    `);

    await pool.query(`
      CREATE TABLE events (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        date TIMESTAMP NOT NULL,
        location_id INTEGER REFERENCES locations(id),
        description TEXT,
        image TEXT
      );
    `);

    console.log('Tables created successfully.');

    await pool.query(`
      INSERT INTO locations (name, address, description, image) VALUES
        ('Community Hall', '123 Main St', 'A place for community events.', 'https://www.russellcountry.com/uploads/6/1/9/4/61940435/editor/_2660448.jpg'),
        ('Central Park', 'Park Ave', 'The central park of the city.', 'https://longmontcolorado.gov/wp-content/uploads/2024/07/6335144671_673963a212_o.jpeg'),
        ('Library', '456 Elm St', 'Public library with event rooms.', 'https://cdn.prod.website-files.com/604a97c70aee09eed25ce991/61897a35583a9b51db018d3e_MartinPublicSeating-97560-Importance-School-Library-blogbanner1.jpg'),
        ('Downtown Plaza', '789 Oak St', 'Open space for public gatherings.', 'https://www.tampa.gov/sites/default/files/styles/slick_media/public/slideshow/slides/agualuces1.jpg?itok=O_LmKAU6');
    `);

    await pool.query(`
      INSERT INTO events (name, date, location_id, description, image) VALUES
        ('Music Concert', '2024-11-20 19:00:00', 1, 'An evening of classical music.', 'https://media.self.com/photos/5e70f72443731c000882cfe7/4:3/w_2560%2Cc_limit/GettyImages-125112134.jpg'),
        ('Art Fair', '2024-12-05 10:00:00', 2, 'Local artists showcase their work.', 'https://hips.hearstapps.com/hmg-prod/images/art-basel-miami-beach-eric-firestone-1653334339.jpg'),
        ('Book Club Meeting', '2024-11-15 17:00:00', 3, 'Discussing the book of the month.', 'https://myreadingvintage.com/cdn/shop/articles/how_to_read_a_book_for_a_book_club_1570x.png?v=1705180056'),
        ('Farmers Market', '2024-11-10 08:00:00', 4, 'Fresh produce and local goods.', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6S6TtCFtTy9rvlqVT25tAMpcQ56ZWFSN3Ug&s');
    `);

    console.log('Initial data inserted successfully.');
  } catch (err) {
    console.error('Error initializing database:', err);
  } finally {
    await pool.end();
  }
};

createTables();
