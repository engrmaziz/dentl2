import bcrypt from 'bcrypt';
import path from 'path';
import fs from 'fs';
import Database from 'better-sqlite3';

const DB_PATH = process.env.DB_PATH || './data/clinic.db';
const resolvedPath = path.resolve(DB_PATH);

const dir = path.dirname(resolvedPath);
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

const db = new Database(resolvedPath);
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

const schemaPath = path.join(__dirname, 'schema.sql');
if (fs.existsSync(schemaPath)) {
  const schema = fs.readFileSync(schemaPath, 'utf-8');
  db.exec(schema);
}

async function seed(): Promise<void> {
  console.log('🌱 Starting database seed...');

  // Clear existing data
  db.exec(`
    DELETE FROM contact_submissions;
    DELETE FROM gallery_images;
    DELETE FROM blog_posts;
    DELETE FROM appointments;
    DELETE FROM doctors;
    DELETE FROM admin_users;
    DELETE FROM clinic_settings;
  `);

  // ── Admin user ─────────────────────────────────────────────────────────────
  const passwordHash = await bcrypt.hash('Admin123!', 12);
  db.prepare(`
    INSERT INTO admin_users (email, password_hash, name, role)
    VALUES (?, ?, ?, ?)
  `).run('admin@smileclinic.com', passwordHash, 'Dr. Admin', 'admin');
  console.log('✅ Admin user created (admin@smileclinic.com / Admin123!)');

  // ── Doctors ────────────────────────────────────────────────────────────────
  const doctors = [
    {
      name: 'Dr. Sophia Laurent',
      title: 'DDS, MS',
      specialization: 'Cosmetic Dentistry',
      bio: 'Dr. Laurent specialises in smile transformations, combining artistry with advanced techniques to deliver stunning, natural-looking results. With over 15 years of experience, she has helped thousands of patients achieve the smile of their dreams.',
      education: JSON.stringify(['DDS – New York University College of Dentistry', 'MS Cosmetic Dentistry – UCLA School of Dentistry', 'Fellowship – American Academy of Cosmetic Dentistry']),
      languages: JSON.stringify(['English', 'French', 'Spanish']),
      availability: JSON.stringify({ monday: ['09:00', '17:00'], tuesday: ['09:00', '17:00'], wednesday: ['10:00', '18:00'], thursday: ['09:00', '17:00'], friday: ['09:00', '15:00'] }),
    },
    {
      name: 'Dr. Marcus Chen',
      title: 'DMD, PhD',
      specialization: 'Implantology & Oral Surgery',
      bio: 'A pioneer in full-arch implant rehabilitation, Dr. Chen has performed over 2,000 implant placements. His research on osseointegration has been published in leading dental journals worldwide.',
      education: JSON.stringify(['DMD – Harvard School of Dental Medicine', 'PhD Oral Biology – University of Michigan', 'Certificate in Implantology – ITI International']),
      languages: JSON.stringify(['English', 'Mandarin', 'Cantonese']),
      availability: JSON.stringify({ monday: ['08:00', '16:00'], wednesday: ['08:00', '16:00'], friday: ['08:00', '14:00'] }),
    },
    {
      name: 'Dr. Isabelle Moreau',
      title: 'DDS',
      specialization: 'Orthodontics & Invisalign',
      bio: 'Dr. Moreau is a certified Invisalign Diamond Provider and specialist orthodontist with a passion for creating perfectly aligned, beautiful smiles for both adults and children.',
      education: JSON.stringify(['DDS – Paris Descartes University', 'Orthodontic Residency – University of Southern California', 'Invisalign Diamond Provider Certification']),
      languages: JSON.stringify(['English', 'French', 'Italian']),
      availability: JSON.stringify({ tuesday: ['09:00', '17:00'], thursday: ['09:00', '17:00'], saturday: ['09:00', '13:00'] }),
    },
    {
      name: 'Dr. Rafael Santos',
      title: 'DDS, FICOI',
      specialization: 'Periodontics & Gum Aesthetics',
      bio: 'Dr. Santos is a fellowship-trained periodontist specialising in gum disease treatment, gum contouring and the Pink Aesthetics framework. He believes that healthy gums are the foundation of a beautiful smile.',
      education: JSON.stringify(['DDS – University of São Paulo', 'Periodontal Residency – Tufts University School of Dental Medicine', 'Fellowship – International Congress of Oral Implantologists']),
      languages: JSON.stringify(['English', 'Portuguese', 'Spanish']),
      availability: JSON.stringify({ monday: ['10:00', '18:00'], tuesday: ['10:00', '18:00'], thursday: ['10:00', '18:00'] }),
    },
    {
      name: 'Dr. Anika Patel',
      title: 'BDS, MDS',
      specialization: 'Paediatric Dentistry',
      bio: 'Dr. Patel creates a warm, anxiety-free environment for children, nurturing positive dental habits from an early age. She is known for her exceptional patience and ability to connect with young patients.',
      education: JSON.stringify(['BDS – King\'s College London', 'MDS Paediatric Dentistry – University of Edinburgh', 'Diploma in Conscious Sedation for Children']),
      languages: JSON.stringify(['English', 'Hindi', 'Gujarati']),
      availability: JSON.stringify({ monday: ['09:00', '17:00'], wednesday: ['09:00', '17:00'], friday: ['09:00', '17:00'] }),
    },
    {
      name: 'Dr. James Whitfield',
      title: 'DDS, FAGD',
      specialization: 'Restorative & General Dentistry',
      bio: 'Dr. Whitfield brings a holistic approach to comprehensive dental care, blending cutting-edge restorative techniques with a deep commitment to patient comfort. He is a Fellow of the Academy of General Dentistry.',
      education: JSON.stringify(['DDS – University of Pennsylvania School of Dental Medicine', 'Fellowship – Academy of General Dentistry', 'Certificate in Advanced Restorative Techniques – Pankey Institute']),
      languages: JSON.stringify(['English']),
      availability: JSON.stringify({ tuesday: ['08:00', '16:00'], wednesday: ['08:00', '16:00'], thursday: ['08:00', '16:00'], friday: ['08:00', '14:00'] }),
    },
  ];

  const insertDoctor = db.prepare(`
    INSERT INTO doctors (name, title, specialization, bio, education, languages, availability, is_active)
    VALUES (@name, @title, @specialization, @bio, @education, @languages, @availability, 1)
  `);
  doctors.forEach(d => insertDoctor.run(d));
  console.log(`✅ ${doctors.length} doctors created`);

  // ── Appointments ──────────────────────────────────────────────────────────
  const services = [
    'Teeth Whitening', 'Porcelain Veneers', 'Dental Implant Consultation',
    'Invisalign Consultation', 'Routine Check-up & Clean', 'Root Canal Treatment',
    'Dental Crown', 'Composite Bonding', 'Gum Contouring', 'Emergency Dental Care',
  ];
  const statuses = ['pending', 'confirmed', 'confirmed', 'confirmed', 'completed', 'cancelled'];
  const times = ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'];
  const patients = [
    { name: 'Emma Thompson', email: 'emma.t@example.com', phone: '+1 (555) 234-5678' },
    { name: 'Liam Johnson', email: 'liam.j@example.com', phone: '+1 (555) 345-6789' },
    { name: 'Olivia Davis', email: 'olivia.d@example.com', phone: '+1 (555) 456-7890' },
    { name: 'Noah Wilson', email: 'noah.w@example.com', phone: '+1 (555) 567-8901' },
    { name: 'Ava Martinez', email: 'ava.m@example.com', phone: '+1 (555) 678-9012' },
    { name: 'William Anderson', email: 'william.a@example.com', phone: '+1 (555) 789-0123' },
    { name: 'Sophia Taylor', email: 'sophia.t@example.com', phone: '+1 (555) 890-1234' },
    { name: 'James Thomas', email: 'james.th@example.com', phone: '+1 (555) 901-2345' },
    { name: 'Isabella Jackson', email: 'isabella.j@example.com', phone: '+1 (555) 012-3456' },
    { name: 'Oliver White', email: 'oliver.w@example.com', phone: '+1 (555) 123-4567' },
    { name: 'Mia Harris', email: 'mia.h@example.com', phone: '+1 (555) 234-5679' },
    { name: 'Elijah Martin', email: 'elijah.m@example.com', phone: '+1 (555) 345-6780' },
    { name: 'Charlotte Garcia', email: 'charlotte.g@example.com', phone: '+1 (555) 456-7891' },
    { name: 'Lucas Rodriguez', email: 'lucas.r@example.com', phone: '+1 (555) 567-8902' },
    { name: 'Amelia Lewis', email: 'amelia.l@example.com', phone: '+1 (555) 678-9013' },
    { name: 'Mason Lee', email: 'mason.l@example.com', phone: '+1 (555) 789-0124' },
    { name: 'Harper Walker', email: 'harper.w@example.com', phone: '+1 (555) 890-1235' },
    { name: 'Ethan Hall', email: 'ethan.h@example.com', phone: '+1 (555) 901-2346' },
    { name: 'Evelyn Allen', email: 'evelyn.a@example.com', phone: '+1 (555) 012-3457' },
    { name: 'Alexander Young', email: 'alex.y@example.com', phone: '+1 (555) 123-4568' },
  ];

  const insertAppt = db.prepare(`
    INSERT INTO appointments (patient_name, patient_email, patient_phone, service, doctor_id, appointment_date, appointment_time, status, notes)
    VALUES (@patient_name, @patient_email, @patient_phone, @service, @doctor_id, @appointment_date, @appointment_time, @status, @notes)
  `);

  const today = new Date();
  patients.forEach((p, i) => {
    const daysOffset = Math.floor(Math.random() * 30) + 1;
    const d = new Date(today);
    d.setDate(d.getDate() + daysOffset);
    const dateStr = d.toISOString().split('T')[0];
    insertAppt.run({
      patient_name: p.name,
      patient_email: p.email,
      patient_phone: p.phone,
      service: services[i % services.length],
      doctor_id: (i % 6) + 1,
      appointment_date: dateStr,
      appointment_time: times[i % times.length],
      status: statuses[i % statuses.length],
      notes: i % 3 === 0 ? 'Patient requested extra whitening trays.' : null,
    });
  });
  console.log(`✅ 20 appointments created`);

  // ── Blog posts ─────────────────────────────────────────────────────────────
  const posts = [
    {
      title: 'The Complete Guide to Porcelain Veneers: Transform Your Smile in Just Two Visits',
      slug: 'complete-guide-porcelain-veneers',
      excerpt: 'Porcelain veneers are ultra-thin ceramic shells that can correct chips, stains, gaps and misalignment — all in two appointments.',
      content: `<h2>What Are Porcelain Veneers?</h2><p>Porcelain veneers are ultra-thin, custom-crafted ceramic shells bonded to the front surface of your teeth. They are one of the most versatile cosmetic treatments available, capable of addressing a wide range of aesthetic concerns including discolouration, chips, cracks, mild misalignment and uneven spacing.</p><h2>The Two-Visit Process</h2><p>During your first visit, we take precise digital impressions and prepare the teeth by removing a minimal amount of enamel. Temporary veneers are fitted while your permanent restorations are crafted in our partner ceramics laboratory. At your second visit, the finished veneers are bonded in place using a strong dental adhesive and cured with a special light.</p><h2>How Long Do They Last?</h2><p>With proper care, porcelain veneers can last 15–20 years. We recommend avoiding biting on very hard foods, wearing a night guard if you grind your teeth, and attending regular check-ups every six months.</p><h2>Cost Considerations</h2><p>The investment for porcelain veneers varies depending on the number of teeth treated. During your complimentary smile consultation, our team will provide a detailed, transparent treatment plan and explore all available financing options.</p>`,
      category: 'Cosmetic Dentistry',
      tags: JSON.stringify(['veneers', 'cosmetic', 'smile makeover', 'porcelain']),
      status: 'published',
      read_time: 5,
      published_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      title: 'Invisalign vs Traditional Braces: Which Is Right for You?',
      slug: 'invisalign-vs-traditional-braces',
      excerpt: 'Both Invisalign and traditional braces can create beautifully aligned smiles — but they suit different lifestyles and clinical situations.',
      content: `<h2>How Invisalign Works</h2><p>Invisalign uses a series of clear, removable aligners to gradually shift your teeth into the desired position. Each set is worn for approximately one to two weeks before progressing to the next. Because the aligners are virtually invisible and removable, they appeal strongly to adults and image-conscious teenagers.</p><h2>How Traditional Braces Work</h2><p>Metal or ceramic brackets are bonded to the teeth and connected by archwires that apply controlled pressure. Traditional braces are particularly effective for complex orthodontic cases including severe crowding, deep bites and significant rotations.</p><h2>Key Differences</h2><ul><li><strong>Aesthetics:</strong> Invisalign is nearly invisible; braces are more noticeable.</li><li><strong>Comfort:</strong> Invisalign trays have smooth edges; braces may cause initial soreness.</li><li><strong>Maintenance:</strong> Invisalign trays are removed for eating and cleaning; braces require more careful oral hygiene.</li><li><strong>Suitability:</strong> Braces handle the most complex cases; Invisalign is excellent for mild to moderate corrections.</li></ul><h2>Which Should You Choose?</h2><p>Book a complimentary orthodontic assessment with Dr. Moreau. She will evaluate your specific case and help you choose the treatment that best fits your clinical needs, lifestyle and budget.</p>`,
      category: 'Orthodontics',
      tags: JSON.stringify(['invisalign', 'braces', 'orthodontics', 'teeth straightening']),
      status: 'published',
      read_time: 6,
      published_at: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      title: 'Dental Implants: The Gold Standard for Replacing Missing Teeth',
      slug: 'dental-implants-gold-standard',
      excerpt: 'Dental implants are the only tooth replacement option that preserves jawbone and provides a permanent, natural-feeling result.',
      content: `<h2>What Is a Dental Implant?</h2><p>A dental implant is a titanium post surgically placed into the jawbone to act as an artificial tooth root. Once integrated with the bone — a process called osseointegration — it provides a stable foundation for a crown, bridge or implant-supported denture.</p><h2>The Implant Process</h2><p>The journey typically takes three to six months. After a thorough assessment including 3D CBCT imaging, the implant is placed under local anaesthesia. Following a healing period of three to four months, an abutment and custom crown are attached. The result is indistinguishable from a natural tooth.</p><h2>Why Implants Are Superior</h2><p>Unlike bridges, implants do not require modification of adjacent healthy teeth. Unlike dentures, they never slip or click. Critically, they stimulate the jawbone, preventing the bone loss that inevitably follows tooth extraction.</p><h2>Candidacy</h2><p>Most adults in good general health are suitable candidates. Adequate bone volume is required; where bone has been lost, grafting procedures can restore the necessary foundation. Book a complimentary implant consultation with Dr. Chen to explore your options.</p>`,
      category: 'Implantology',
      tags: JSON.stringify(['implants', 'missing teeth', 'oral surgery', 'restorative']),
      status: 'published',
      read_time: 7,
      published_at: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      title: 'Professional Teeth Whitening: What to Expect Before, During and After',
      slug: 'professional-teeth-whitening-guide',
      excerpt: 'Professional whitening delivers results far beyond over-the-counter products — safely, quickly and under expert supervision.',
      content: `<h2>Why Choose Professional Whitening?</h2><p>Over-the-counter whitening products contain low concentrations of active ingredients and ill-fitting trays that can cause uneven results and gum irritation. Professional whitening uses prescription-strength gels applied precisely to tooth surfaces, delivering dramatic results in a single in-chair session or with custom-fitted take-home trays.</p><h2>Before Your Appointment</h2><p>We recommend a professional clean prior to whitening to remove surface stains and tartar. Any existing decay or gum disease should be treated first. If you have veneers, crowns or composite bonding, note that whitening agents do not affect these restorations.</p><h2>During the Treatment</h2><p>For in-chair Zoom whitening, a protective barrier is applied to the gums before the whitening gel is activated with a special LED lamp. The process takes approximately 90 minutes and can lighten teeth by up to 8 shades.</p><h2>After Your Treatment</h2><p>Some sensitivity is normal for 24–48 hours. Avoid staining foods and beverages (coffee, red wine, berries) for 48 hours post-treatment. Results typically last 12–24 months depending on diet and lifestyle.</p>`,
      category: 'Cosmetic Dentistry',
      tags: JSON.stringify(['whitening', 'bleaching', 'cosmetic', 'zoom']),
      status: 'published',
      read_time: 5,
      published_at: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      title: 'The Link Between Gum Health and Your Overall Wellbeing',
      slug: 'gum-health-overall-wellbeing',
      excerpt: 'Research consistently shows that periodontal disease is linked to heart disease, diabetes, and other systemic conditions. Here is what you need to know.',
      content: `<h2>The Oral-Systemic Connection</h2><p>The mouth is a gateway to the rest of the body. Bacteria from periodontal (gum) disease can enter the bloodstream and contribute to inflammation in distant organs. Multiple large-scale studies have established associations between untreated gum disease and cardiovascular disease, type 2 diabetes, respiratory infections, and adverse pregnancy outcomes.</p><h2>Recognising the Warning Signs</h2><ul><li>Gums that bleed when brushing or flossing</li><li>Persistent bad breath</li><li>Red, swollen or tender gums</li><li>Gum recession (teeth appearing longer)</li><li>Loose teeth or changes in bite</li></ul><h2>Prevention and Treatment</h2><p>Twice-daily brushing, daily flossing and professional cleans every six months are the cornerstones of gum health. For active gum disease, deep cleaning (scaling and root planing) performed by Dr. Santos can halt progression and often reverse early bone loss. Advanced cases may benefit from laser periodontal therapy.</p>`,
      category: 'Oral Health',
      tags: JSON.stringify(['gum disease', 'periodontics', 'oral health', 'prevention']),
      status: 'published',
      read_time: 6,
      published_at: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      title: 'Teaching Children Good Dental Habits: A Parent\'s Guide',
      slug: 'teaching-children-good-dental-habits',
      excerpt: 'The habits children develop in their early years set the foundation for a lifetime of healthy smiles. Here is how to make oral care fun and effective.',
      content: `<h2>When to Start</h2><p>Oral care begins before the first tooth erupts. Gently wiping an infant's gums with a damp cloth removes bacteria and familiarises them with the sensation. Once the first tooth appears (typically around six months), begin brushing twice daily with a rice-grain-sized amount of fluoride toothpaste.</p><h2>Making It Fun</h2><p>Use a two-minute sand timer or play a favourite song to make brushing feel like an activity rather than a chore. Let your child choose their own toothbrush featuring a beloved character. Reward charts and sticker systems can reinforce the habit positively.</p><h2>The First Dental Visit</h2><p>The American Academy of Pediatric Dentistry recommends the first dental visit by age one, or within six months of the first tooth appearing. Dr. Patel's gentle, child-centred approach helps young patients develop a positive relationship with the dentist from the very start.</p><h2>Diet and Dental Health</h2><p>Limit sugary snacks and drinks, especially between meals. Water is the best beverage for dental health. Encourage crunchy fruits and vegetables, which naturally clean tooth surfaces and stimulate gum tissue.</p>`,
      category: 'Paediatric Dentistry',
      tags: JSON.stringify(['children', 'paediatric', 'oral hygiene', 'parents', 'prevention']),
      status: 'published',
      read_time: 5,
      published_at: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ];

  const insertPost = db.prepare(`
    INSERT INTO blog_posts (title, slug, excerpt, content, author_id, category, tags, status, read_time, view_count, published_at)
    VALUES (@title, @slug, @excerpt, @content, @author_id, @category, @tags, @status, @read_time, @view_count, @published_at)
  `);
  posts.forEach((p, i) => insertPost.run({ ...p, author_id: 1, view_count: Math.floor(Math.random() * 2000) + 100 }));
  console.log(`✅ ${posts.length} blog posts created`);

  // ── Gallery images ─────────────────────────────────────────────────────────
  const galleryCategories = [
    { cat: 'before-after', label: 'Before & After' },
    { cat: 'clinic', label: 'Our Clinic' },
    { cat: 'team', label: 'Our Team' },
    { cat: 'events', label: 'Events' },
  ];
  const insertImg = db.prepare(`
    INSERT INTO gallery_images (url, thumbnail_url, category, caption, alt_text, sort_order, is_featured)
    VALUES (@url, @thumbnail_url, @category, @caption, @alt_text, @sort_order, @is_featured)
  `);
  let imgIdx = 0;
  galleryCategories.forEach(({ cat, label }) => {
    for (let i = 1; i <= 6; i++) {
      const url = `https://placehold.co/1200x800/C8A96E/FFFFFF?text=${encodeURIComponent(label + '+' + i)}`;
      const thumb = `https://placehold.co/400x300/C8A96E/FFFFFF?text=${encodeURIComponent(label + '+' + i)}`;
      insertImg.run({
        url,
        thumbnail_url: thumb,
        category: cat,
        caption: `${label} — image ${i}`,
        alt_text: `${label} image ${i}`,
        sort_order: imgIdx,
        is_featured: i === 1 ? 1 : 0,
      });
      imgIdx++;
    }
  });
  console.log(`✅ 24 gallery images created`);

  // ── Contact submissions ────────────────────────────────────────────────────
  const contacts = [
    { name: 'Sophie Clarke', email: 'sophie.c@example.com', phone: '+1 (555) 111-2222', service_interest: 'Teeth Whitening', message: 'I am interested in whitening my teeth before my wedding next month. Please let me know your availability.', is_read: 1, is_starred: 1 },
    { name: 'Daniel Park', email: 'daniel.p@example.com', phone: '+1 (555) 222-3333', service_interest: 'Dental Implants', message: 'I lost a tooth in an accident last year and would like to explore implant options. What does the process involve?', is_read: 1, is_starred: 0 },
    { name: 'Grace Murphy', email: 'grace.m@example.com', phone: null, service_interest: 'Invisalign', message: 'I have been self-conscious about my crooked teeth for years. Would Invisalign work for my case?', is_read: 0, is_starred: 1 },
    { name: 'Henry Collins', email: 'henry.c@example.com', phone: '+1 (555) 333-4444', service_interest: 'Porcelain Veneers', message: 'I saw your before-and-after gallery and would love to book a smile consultation. What is the first step?', is_read: 0, is_starred: 0 },
    { name: 'Lily Evans', email: 'lily.e@example.com', phone: '+1 (555) 444-5555', service_interest: null, message: 'I have been looking for a new family dentist. Do you accept new patients and do you see children?', is_read: 1, is_starred: 0 },
    { name: 'Jack Turner', email: 'jack.t@example.com', phone: '+1 (555) 555-6666', service_interest: 'Emergency Dental Care', message: 'I have severe tooth pain that started yesterday. Do you have any emergency slots available this week?', is_read: 1, is_starred: 1 },
    { name: 'Chloe Wright', email: 'chloe.w@example.com', phone: null, service_interest: 'Composite Bonding', message: 'I chipped a front tooth and am wondering if bonding would be a good solution. What would you recommend?', is_read: 0, is_starred: 0 },
    { name: 'Ryan Mitchell', email: 'ryan.m@example.com', phone: '+1 (555) 666-7777', service_interest: 'Dental Crown', message: 'My dentist at home recommended a crown for a cracked molar. I am relocating to this area and would like to continue treatment.', is_read: 0, is_starred: 0 },
    { name: 'Zoe Campbell', email: 'zoe.c@example.com', phone: '+1 (555) 777-8888', service_interest: 'Routine Check-up', message: 'It has been about two years since my last dental check-up. I would like to book an appointment for a full examination and clean.', is_read: 1, is_starred: 0 },
    { name: 'Nathan Brooks', email: 'nathan.b@example.com', phone: '+1 (555) 888-9999', service_interest: 'Gum Contouring', message: 'I have always had a very gummy smile. I read about gum contouring on your blog — could this help in my case?', is_read: 0, is_starred: 0 },
  ];

  const insertContact = db.prepare(`
    INSERT INTO contact_submissions (name, email, phone, service_interest, message, is_read, is_starred, ip_address)
    VALUES (@name, @email, @phone, @service_interest, @message, @is_read, @is_starred, @ip_address)
  `);
  contacts.forEach(c => insertContact.run({ ...c, ip_address: '127.0.0.1' }));
  console.log(`✅ ${contacts.length} contact submissions created`);

  // ── Clinic settings ────────────────────────────────────────────────────────
  const settings: Array<[string, string]> = [
    ['clinic_name', 'Smile Dental Clinic'],
    ['clinic_tagline', 'Where Art Meets Dentistry'],
    ['clinic_address', '100 Harley Street, London, W1G 7JA'],
    ['clinic_phone', '+44 (0)20 7946 0958'],
    ['clinic_email', 'hello@smileclinic.com'],
    ['clinic_hours', JSON.stringify({ monday: '08:00–18:00', tuesday: '08:00–18:00', wednesday: '08:00–18:00', thursday: '08:00–18:00', friday: '08:00–17:00', saturday: '09:00–14:00', sunday: 'Closed' })],
    ['clinic_instagram', 'https://instagram.com/smileclinic'],
    ['clinic_facebook', 'https://facebook.com/smileclinic'],
    ['booking_advance_days', '60'],
    ['appointment_reminder_hours', '24'],
    ['currency', 'GBP'],
    ['currency_symbol', '£'],
  ];

  const insertSetting = db.prepare(`INSERT OR REPLACE INTO clinic_settings (key, value) VALUES (?, ?)`);
  settings.forEach(([k, v]) => insertSetting.run(k, v));
  console.log(`✅ ${settings.length} clinic settings created`);

  console.log('\n✨ Seed complete!');
  db.close();
}

seed().catch(err => {
  console.error('Seed failed:', err);
  process.exit(1);
});
