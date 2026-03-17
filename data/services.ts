import type { Service } from "@/types";

export const services: Service[] = [
  {
    id: 1,
    slug: "general-dentistry",
    name: "General Dentistry",
    tagline: "The Foundation of a Healthy Smile",
    shortDescription:
      "Comprehensive preventive and restorative care to maintain optimal oral health throughout every stage of life.",
    fullDescription:
      "General dentistry forms the cornerstone of oral healthcare. Our approach combines thorough examination with personalised treatment planning to address everything from routine cleanings to complex restorations. We believe that prevention is always preferable to cure, and our team works diligently to detect potential issues before they escalate into costly or painful problems.",
    whatIsIt:
      "General dentistry encompasses the diagnosis, prevention, and treatment of a wide range of oral health conditions. It includes regular check-ups, professional cleanings, fillings, and early detection of potential issues before they become serious. Our general dentistry services provide the foundation upon which all other treatments are built.",
    whoNeedsIt:
      "Everyone benefits from regular general dentistry appointments, regardless of age. We recommend biannual visits for most patients, with more frequent visits for those with a history of gum disease, cavities, or other ongoing concerns. Children, adults, and seniors all have unique dental needs that our experienced team is equipped to address.",
    procedure: [
      {
        step: 1,
        title: "Comprehensive Examination",
        description:
          "A thorough assessment of your teeth, gums, bite, and oral tissues using digital X-rays and intraoral cameras to identify any areas of concern.",
      },
      {
        step: 2,
        title: "Professional Cleaning",
        description:
          "Removal of plaque, tartar, and staining that regular brushing and flossing cannot address, leaving your teeth polished and refreshed.",
      },
      {
        step: 3,
        title: "Treatment Planning",
        description:
          "A personalised care plan addressing any existing issues and preventive measures tailored specifically to your oral health goals.",
      },
      {
        step: 4,
        title: "Follow-up Care",
        description:
          "Guidance on home care routines and scheduling for future visits to maintain the progress we've achieved together.",
      },
    ],
    benefits: [
      "Early detection of dental problems",
      "Prevention of gum disease and tooth decay",
      "Fresher breath and cleaner teeth",
      "Personalised oral health guidance",
      "Long-term cost savings through prevention",
      "Improved overall health outcomes",
    ],
    faqs: [
      {
        q: "How often should I visit the dentist?",
        a: "We recommend visiting every six months for most patients. Those with specific conditions such as gum disease or a high cavity risk may benefit from quarterly visits.",
      },
      {
        q: "Does professional cleaning hurt?",
        a: "Most patients find the process entirely comfortable. We use ultrasonic scalers and gentle techniques to minimise any discomfort, and local anaesthetic is available if needed.",
      },
      {
        q: "What happens during a dental X-ray?",
        a: "Digital X-rays use a fraction of the radiation of traditional films and take only seconds. They allow us to detect decay, bone loss, and other issues invisible to the naked eye.",
      },
    ],
    duration: "45–90 minutes",
    priceRange: "£60–£200",
    icon: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z",
    relatedServices: ["teeth-whitening", "gum-disease", "crowns-bridges"],
  },
  {
    id: 2,
    slug: "teeth-whitening",
    name: "Teeth Whitening",
    tagline: "Illuminate Your Smile",
    shortDescription:
      "Professional-grade whitening treatments that deliver dramatically brighter results safely and comfortably.",
    fullDescription:
      "Our professional teeth whitening treatments go far beyond anything available over the counter. Using pharmaceutical-grade bleaching agents and precision-controlled light activation, we can lighten your teeth by up to ten shades in a single session, or provide you with a bespoke take-home kit for gradual, comfortable brightening at your own pace.",
    whatIsIt:
      "Teeth whitening is a cosmetic dental procedure that uses peroxide-based bleaching agents to break down and lift stains from the enamel and dentine. Professional whitening is significantly more effective and safer than shop-bought products because the concentrations are calibrated to your specific sensitivity levels and dental history.",
    whoNeedsIt:
      "Teeth whitening is ideal for anyone whose teeth have become discoloured through coffee, tea, wine, tobacco, or simply the natural ageing process. It is also popular ahead of weddings, milestone events, or simply as a confidence boost. Whitening works best on natural teeth; crowns, veneers, and composite bonding will not lighten.",
    procedure: [
      {
        step: 1,
        title: "Shade Assessment",
        description:
          "We photograph and record your current tooth shade using a calibrated shade guide to measure your progress accurately.",
      },
      {
        step: 2,
        title: "Gum Protection",
        description:
          "A protective barrier is applied to your gums and soft tissues to prevent any irritation from the whitening agent.",
      },
      {
        step: 3,
        title: "Bleaching Agent Application",
        description:
          "Our professional-grade whitening gel is carefully applied to each tooth surface and activated using an LED light for maximum penetration.",
      },
      {
        step: 4,
        title: "Results Review",
        description:
          "We compare your new shade to your starting point and provide aftercare instructions to prolong your brilliant results.",
      },
    ],
    benefits: [
      "Up to ten shades brighter in one visit",
      "Safe and professionally supervised",
      "Long-lasting results with proper maintenance",
      "Boosted confidence and self-esteem",
      "Bespoke take-home kits available",
      "Minimal sensitivity with our gentle formula",
    ],
    faqs: [
      {
        q: "How long do whitening results last?",
        a: "In-chair results typically last 12–18 months with good oral hygiene and dietary care. Touch-up treatments or at-home trays can extend this significantly.",
      },
      {
        q: "Will whitening make my teeth sensitive?",
        a: "Some patients experience temporary sensitivity lasting 24–48 hours. We use desensitising agents within the treatment and recommend a sensitivity toothpaste in the days following.",
      },
      {
        q: "Can I whiten if I have crowns or veneers?",
        a: "Whitening agents do not affect ceramic or composite restorations. If your natural teeth lighten around existing restorations, replacement may be considered to ensure a uniform smile.",
      },
    ],
    duration: "60–90 minutes",
    priceRange: "£350–£700",
    icon: "M12 3L1 9l11 6 9-4.91V17h2V9L12 3zM5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z",
    relatedServices: ["veneers", "smile-makeover", "general-dentistry"],
  },
  {
    id: 3,
    slug: "dental-implants",
    name: "Dental Implants",
    tagline: "Permanent Roots. Natural Confidence.",
    shortDescription:
      "State-of-the-art titanium implants that replace missing teeth with a permanent, natural-looking solution.",
    fullDescription:
      "Dental implants represent the gold standard in tooth replacement. A titanium post is surgically placed into the jawbone, where it fuses with the bone over several months — a process called osseointegration. Once integrated, a bespoke ceramic crown is attached, creating a replacement tooth that is virtually indistinguishable from your natural dentition and capable of lasting a lifetime with proper care.",
    whatIsIt:
      "A dental implant is a small titanium screw that acts as an artificial tooth root. Once it integrates with the jawbone, it provides a stable foundation for a crown, bridge, or denture. Unlike dentures or bridges, implants do not rely on neighbouring teeth for support and actively help preserve jawbone density.",
    whoNeedsIt:
      "Implants are suitable for adults who have lost one or more teeth due to decay, injury, or gum disease, and who have sufficient healthy jawbone to support the implant. Those with conditions like uncontrolled diabetes or who smoke heavily may require additional assessment. A CBCT scan is used to assess bone volume precisely.",
    procedure: [
      {
        step: 1,
        title: "Consultation & Imaging",
        description:
          "3D CBCT scanning allows us to assess bone depth, width, and density to plan implant placement with surgical precision.",
      },
      {
        step: 2,
        title: "Implant Placement",
        description:
          "Under local anaesthesia, the titanium implant is placed into the jawbone through a small incision. Most patients report minimal discomfort.",
      },
      {
        step: 3,
        title: "Osseointegration",
        description:
          "Over 3–6 months, the implant fuses with the surrounding bone. A temporary restoration is provided during this healing phase.",
      },
      {
        step: 4,
        title: "Abutment & Crown Placement",
        description:
          "Once fully integrated, a connector piece (abutment) is attached, followed by your custom-crafted ceramic crown.",
      },
    ],
    benefits: [
      "Permanent, lifelong tooth replacement",
      "Preserves jawbone and facial structure",
      "Functions and feels like a natural tooth",
      "No impact on adjacent teeth",
      "Easy to clean — no special maintenance",
      "High success rate exceeding 95%",
    ],
    faqs: [
      {
        q: "How long does the implant process take?",
        a: "From initial consultation to final crown placement, the process typically takes 6–12 months. Complex cases involving bone grafting may take longer.",
      },
      {
        q: "Is implant surgery painful?",
        a: "The procedure is carried out under local anaesthesia and is generally no more uncomfortable than a tooth extraction. Mild soreness for a few days post-surgery is normal and managed with over-the-counter pain relief.",
      },
      {
        q: "How long do dental implants last?",
        a: "With proper care, implants can last a lifetime. The crown component typically lasts 15–20 years before replacement may be considered.",
      },
    ],
    duration: "1–2 hours per stage",
    priceRange: "£2,500–£4,500 per implant",
    icon: "M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 4l6 2.67V11c0 3.57-2.41 6.9-6 7.93C8.41 17.9 6 14.57 6 11V7.67L12 5z",
    relatedServices: ["oral-surgery", "crowns-bridges", "dentures"],
  },
  {
    id: 4,
    slug: "orthodontics",
    name: "Orthodontics",
    tagline: "Straighten Your Path to Perfection",
    shortDescription:
      "Precision orthodontic treatment to correct misalignment and create a balanced, healthy bite.",
    fullDescription:
      "Orthodontic treatment corrects the alignment of teeth and jaws, improving both the appearance and function of your smile. Whether you prefer the precision of traditional braces, the discretion of ceramic brackets, or the near-invisibility of clear aligners, our orthodontic specialists design treatments around your lifestyle and aesthetic preferences.",
    whatIsIt:
      "Orthodontics is the dental specialty focused on correcting misaligned teeth (malocclusion) and jaw irregularities. Using controlled, gentle pressure over time, orthodontic appliances move teeth into their ideal positions. This not only enhances aesthetics but also improves bite function, making teeth easier to clean and reducing wear.",
    whoNeedsIt:
      "Orthodontic treatment is suitable for children, teenagers, and adults. Common indicators include crowded or overlapping teeth, gaps between teeth, crossbites, overbites, underbites, and protruding teeth. A comprehensive orthodontic assessment including digital impressions and X-rays will determine the most appropriate treatment approach.",
    procedure: [
      {
        step: 1,
        title: "Orthodontic Assessment",
        description:
          "Digital impressions, photographs, and X-rays are taken to create a full picture of your teeth, bite, and jaw structure.",
      },
      {
        step: 2,
        title: "Treatment Planning",
        description:
          "Using advanced software, we simulate your treatment journey and projected outcome, allowing you to see your results before beginning.",
      },
      {
        step: 3,
        title: "Appliance Fitting",
        description:
          "Your chosen orthodontic appliance — whether braces or clear aligners — is fitted with care and comfort as the priority.",
      },
      {
        step: 4,
        title: "Regular Adjustments",
        description:
          "Progress appointments every 6–8 weeks allow us to make adjustments, monitor progress, and ensure treatment stays on track.",
      },
      {
        step: 5,
        title: "Retention Phase",
        description:
          "Once teeth are in their final position, retainers ensure they remain stable and do not shift back over time.",
      },
    ],
    benefits: [
      "Straighter, more symmetrical smile",
      "Improved bite function and jaw comfort",
      "Easier to clean teeth reduce cavity risk",
      "Options to suit every lifestyle and budget",
      "Lasting results maintained by retainers",
      "Positive impact on confidence and wellbeing",
    ],
    faqs: [
      {
        q: "Am I too old for orthodontic treatment?",
        a: "There is no upper age limit for orthodontics. Provided your teeth and gums are healthy, adults of any age can achieve excellent results with modern orthodontic techniques.",
      },
      {
        q: "How long will treatment take?",
        a: "Treatment duration varies from 6 months for mild cases to 24 months for more complex alignment issues. Your personalised treatment plan will include a specific timeline.",
      },
      {
        q: "Will braces affect my speech?",
        a: "There may be a brief adjustment period of 1–2 weeks. Most patients adapt quickly and notice little to no lasting impact on their speech.",
      },
    ],
    duration: "6–24 months (full treatment)",
    priceRange: "£2,000–£6,000",
    icon: "M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14H7v-2h5v2zm5-4H7v-2h10v2zm0-4H7V7h10v2z",
    relatedServices: ["invisalign", "smile-makeover", "general-dentistry"],
  },
  {
    id: 5,
    slug: "root-canal",
    name: "Root Canal Treatment",
    tagline: "Saving Teeth. Relieving Pain.",
    shortDescription:
      "Advanced endodontic treatment to eliminate infection, relieve pain, and preserve your natural tooth.",
    fullDescription:
      "Root canal treatment has an undeserved reputation for being painful — in reality, it relieves pain rather than causes it. Modern endodontic techniques, combined with precision anaesthesia, mean the procedure is no more uncomfortable than a routine filling. Our endodontists use rotary nickel-titanium instruments and digital apex locators for exceptional accuracy and predictable outcomes.",
    whatIsIt:
      "Root canal treatment (endodontics) involves removing infected or inflamed pulp tissue from within a tooth, cleaning and shaping the root canals, and sealing them to prevent reinfection. The tooth is then restored with a crown to protect it from fracture and restore full function.",
    whoNeedsIt:
      "Root canal treatment is necessary when the dental pulp — the soft tissue inside the tooth containing nerves and blood vessels — becomes infected or severely inflamed due to deep decay, a cracked tooth, or repeated dental procedures. Symptoms may include severe toothache, prolonged sensitivity to temperature, swelling, or a dental abscess.",
    procedure: [
      {
        step: 1,
        title: "Diagnosis & X-ray",
        description:
          "Digital periapical X-rays and clinical examination determine the extent of infection and the root canal anatomy.",
      },
      {
        step: 2,
        title: "Anaesthesia & Isolation",
        description:
          "Local anaesthesia ensures complete comfort. A rubber dam is placed to keep the area clean and dry throughout.",
      },
      {
        step: 3,
        title: "Canal Preparation",
        description:
          "Infected pulp is removed and the canals are carefully shaped using precision rotary instruments to allow thorough disinfection.",
      },
      {
        step: 4,
        title: "Disinfection & Obturation",
        description:
          "Canals are irrigated with antimicrobial solutions and then filled with biocompatible gutta-percha to seal them permanently.",
      },
      {
        step: 5,
        title: "Crown Restoration",
        description:
          "A ceramic crown is placed over the tooth to restore its strength, function, and appearance.",
      },
    ],
    benefits: [
      "Eliminates infection and relieves pain",
      "Preserves your natural tooth",
      "Prevents spread of infection",
      "Restores full biting and chewing function",
      "Avoids more costly tooth replacement",
      "High success rate with modern techniques",
    ],
    faqs: [
      {
        q: "Is root canal treatment painful?",
        a: "The procedure is performed under local anaesthesia and should be no more uncomfortable than having a filling. Any post-operative sensitivity typically resolves within a few days.",
      },
      {
        q: "How many appointments will I need?",
        a: "Most root canal treatments are completed in 1–2 appointments. Complex cases or teeth with curved canals may require additional visits.",
      },
      {
        q: "What happens if I don't have the treatment?",
        a: "Without treatment, the infection will spread, the tooth will likely be lost, and the infection may affect surrounding teeth and bone — potentially becoming a serious health concern.",
      },
    ],
    duration: "60–120 minutes per visit",
    priceRange: "£600–£1,400",
    icon: "M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-7v2h2v-2h-2zm2-1.645A3.502 3.502 0 0 0 12 6.5a3.501 3.501 0 0 0-3.433 2.813l1.97.446A1.5 1.5 0 1 1 12 11.5a1 1 0 0 0-1 1V14h2v-.645z",
    relatedServices: ["crowns-bridges", "general-dentistry", "emergency-dentistry"],
  },
  {
    id: 6,
    slug: "veneers",
    name: "Porcelain Veneers",
    tagline: "Sculpted Perfection, Naturally Beautiful",
    shortDescription:
      "Ultra-thin porcelain shells crafted to perfection, transforming your smile with minimal tooth preparation.",
    fullDescription:
      "Porcelain veneers are one of the most transformative cosmetic dental procedures available. These wafer-thin ceramic shells are bonded to the front surface of your teeth to correct colour, shape, size, and alignment simultaneously. Fabricated by master dental ceramists, our veneers are indistinguishable from natural tooth enamel, with the same translucency, depth, and luminosity.",
    whatIsIt:
      "A dental veneer is a thin layer of porcelain (typically 0.3–0.7mm) that is permanently bonded to the front surface of a tooth. Modern minimal-prep and no-prep veneers require little to no removal of existing tooth structure, making them a conservative yet profoundly effective cosmetic solution.",
    whoNeedsIt:
      "Veneers are ideal for patients with permanently stained or discoloured teeth that do not respond to whitening, chipped or broken teeth, slightly misaligned or uneven teeth, or gaps between teeth. They are a cornerstone of smile makeover treatment and are particularly popular with patients seeking a complete aesthetic transformation.",
    procedure: [
      {
        step: 1,
        title: "Smile Design Consultation",
        description:
          "Using digital smile design software and photographs, we co-design your ideal smile and preview results before any treatment begins.",
      },
      {
        step: 2,
        title: "Tooth Preparation",
        description:
          "A minimal amount of enamel is removed (or none, for no-prep veneers) to create space for the veneer without altering the tooth's natural structure.",
      },
      {
        step: 3,
        title: "Impressions & Laboratory Fabrication",
        description:
          "Digital impressions are sent to our master ceramist laboratory, where your bespoke veneers are hand-crafted to precise specifications.",
      },
      {
        step: 4,
        title: "Trial Fitting",
        description:
          "Temporary veneers allow you to preview your new smile and request any final adjustments before permanent bonding.",
      },
      {
        step: 5,
        title: "Bonding",
        description:
          "The finished veneers are bonded using the strongest dental adhesive available, polished, and adjusted for a perfect bite.",
      },
    ],
    benefits: [
      "Dramatic smile transformation in 2–3 visits",
      "Stain-resistant porcelain surface",
      "Natural-looking translucency and colour",
      "Minimal to no tooth preparation required",
      "Durable — lasting 15–20 years with care",
      "Corrects multiple aesthetic issues simultaneously",
    ],
    faqs: [
      {
        q: "Are veneers permanent?",
        a: "Veneers are considered a long-term commitment, as a small amount of enamel is typically removed. They last 15–20 years and can be replaced when needed.",
      },
      {
        q: "Will my veneers look natural?",
        a: "Absolutely. Our ceramists use layering techniques that replicate the natural depth and translucency of real enamel. We match your skin tone and facial features to create results that look completely natural.",
      },
      {
        q: "Do veneers require special care?",
        a: "Veneers require the same care as natural teeth — regular brushing, flossing, and dental check-ups. Avoid biting on very hard foods and wearing a night guard is recommended if you grind your teeth.",
      },
    ],
    duration: "2–3 appointments over 2–4 weeks",
    priceRange: "£900–£2,000 per tooth",
    icon: "M9 3L5 6.99h3V14h2V6.99h3L9 3zm7 14.01V10h-2v7.01h-3L15 21l4-3.99h-3z",
    relatedServices: ["teeth-whitening", "smile-makeover", "crowns-bridges"],
  },
  {
    id: 7,
    slug: "pediatric-dentistry",
    name: "Paediatric Dentistry",
    tagline: "Tiny Teeth, Big Smiles",
    shortDescription:
      "Gentle, child-focused dental care that builds positive associations with oral health from the very first visit.",
    fullDescription:
      "Paediatric dentistry at our clinic is built on one principle: every child should leave their appointment with a smile. Our child-friendly environment, gentle techniques, and specially trained team create a dental experience that is engaging, stress-free, and even fun. We invest in early preventive care to set children on a lifelong path to excellent oral health.",
    whatIsIt:
      "Paediatric dentistry specialises in the oral health of infants, children, and adolescents. It encompasses preventive care, monitoring of dental development, treatment of decay, and education for both children and their parents on effective home care routines. Starting dental visits early is essential to establishing healthy habits.",
    whoNeedsIt:
      "The British Society of Paediatric Dentistry recommends a child's first dental visit as soon as their first tooth erupts, or by their first birthday. Regular visits from an early age allow us to monitor development, apply preventive treatments like fissure sealants and fluoride varnish, and intervene early when needed.",
    procedure: [
      {
        step: 1,
        title: "Welcome & Introduction",
        description:
          "We introduce children to the surgery at a gentle pace, allowing them to explore the equipment and meet the team before any treatment.",
      },
      {
        step: 2,
        title: "Examination & Development Check",
        description:
          "A thorough check of teeth, gums, bite, and jaw development, looking for early signs of decay or alignment issues.",
      },
      {
        step: 3,
        title: "Preventive Treatments",
        description:
          "Fluoride varnish and fissure sealants are applied as appropriate to protect vulnerable tooth surfaces from decay.",
      },
      {
        step: 4,
        title: "Parent Education",
        description:
          "We provide tailored advice on diet, brushing technique, and what to expect at each stage of your child's dental development.",
      },
    ],
    benefits: [
      "Builds positive lifelong dental habits",
      "Early detection of developmental issues",
      "Preventive treatments reduce cavity risk",
      "Child-friendly, anxiety-free environment",
      "Expert monitoring of growth and development",
      "Education for the whole family",
    ],
    faqs: [
      {
        q: "When should my child first visit the dentist?",
        a: "We recommend bringing your child when their first tooth appears, or no later than their first birthday. Early visits are short and positive, focused on familiarisation.",
      },
      {
        q: "What if my child is anxious?",
        a: "Dental anxiety in children is very common. Our paediatric team are trained in behaviour management techniques including tell-show-do, distraction, and positive reinforcement to make visits enjoyable.",
      },
      {
        q: "Do baby teeth really matter?",
        a: "Absolutely. Baby teeth hold space for permanent teeth, aid speech development, and enable proper chewing. Decay in baby teeth can cause pain, infection, and affect the development of adult teeth.",
      },
    ],
    duration: "30–45 minutes",
    priceRange: "£50–£180",
    icon: "M12 2a5 5 0 1 0 0 10A5 5 0 0 0 12 2zm0 12c-5.33 0-8 2.67-8 4v2h16v-2c0-1.33-2.67-4-8-4z",
    relatedServices: ["general-dentistry", "orthodontics", "emergency-dentistry"],
  },
  {
    id: 8,
    slug: "oral-surgery",
    name: "Oral Surgery",
    tagline: "Precision, Safety, Expert Care",
    shortDescription:
      "Expert surgical procedures performed with precision and compassion, from simple extractions to complex oral surgery.",
    fullDescription:
      "Our oral surgery service covers the full spectrum of surgical dental procedures, from straightforward tooth extractions to complex surgical removals of impacted wisdom teeth, bone grafting, and pre-implant surgery. All procedures are performed by our specialist oral surgeons using the most advanced surgical protocols and imaging technology.",
    whatIsIt:
      "Oral surgery encompasses any surgical procedure involving the teeth, jaw, or surrounding tissues. This includes tooth extractions, surgical removal of impacted teeth, bone grafts to augment jawbone for implants, soft tissue procedures, cyst removal, and exposure of impacted teeth for orthodontic treatment.",
    whoNeedsIt:
      "Oral surgery may be recommended when a tooth cannot be saved by other means, when wisdom teeth are causing pain or crowding, when bone grafting is required prior to implant placement, or when surgical access is needed to treat more complex conditions. Your surgeon will always explore all conservative options first.",
    procedure: [
      {
        step: 1,
        title: "Pre-surgical Assessment",
        description:
          "CBCT 3D imaging and clinical assessment allow your surgeon to plan the procedure in detail and identify any anatomical considerations.",
      },
      {
        step: 2,
        title: "Anaesthesia & Sedation",
        description:
          "Local anaesthesia is standard; intravenous sedation is available for anxious patients or more complex procedures.",
      },
      {
        step: 3,
        title: "Surgical Procedure",
        description:
          "The procedure is performed with precision instruments following evidence-based surgical protocols to minimise trauma and promote healing.",
      },
      {
        step: 4,
        title: "Post-operative Care",
        description:
          "Detailed aftercare instructions, pain management advice, and a follow-up appointment ensure a smooth, uneventful recovery.",
      },
    ],
    benefits: [
      "Performed by specialist oral surgeons",
      "3D imaging for surgical precision",
      "Sedation available for anxious patients",
      "Minimally traumatic techniques",
      "Thorough aftercare support",
      "Same-day post-operative guidance",
    ],
    faqs: [
      {
        q: "Is tooth extraction painful?",
        a: "Extractions are performed under local anaesthesia and should be entirely comfortable during the procedure. Some soreness afterwards is normal and resolves within a few days.",
      },
      {
        q: "How long is recovery from wisdom tooth removal?",
        a: "Most patients feel comfortable returning to normal activities within 3–5 days. Complete soft tissue healing takes 2–4 weeks.",
      },
      {
        q: "What is a bone graft?",
        a: "A bone graft involves placing bone material into an area of the jaw where bone has been lost. It regenerates natural bone volume, creating the foundation needed for a dental implant.",
      },
    ],
    duration: "30–120 minutes depending on procedure",
    priceRange: "£150–£2,000",
    icon: "M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z",
    relatedServices: ["dental-implants", "emergency-dentistry", "general-dentistry"],
  },
  {
    id: 9,
    slug: "gum-disease",
    name: "Gum Disease Treatment",
    tagline: "Healthy Gums. Healthy Life.",
    shortDescription:
      "Expert periodontal care to treat and manage gum disease, protecting your teeth and your systemic health.",
    fullDescription:
      "Gum disease (periodontal disease) is the leading cause of tooth loss in adults, yet it is largely preventable and, when caught early, entirely reversible. Our periodontists provide comprehensive assessment and treatment across all stages of gum disease, from early gingivitis to advanced periodontitis, using the latest non-surgical and surgical periodontal therapies.",
    whatIsIt:
      "Gum disease is a bacterial infection of the tissues supporting your teeth. Gingivitis — the early stage — involves gum inflammation and bleeding. Left untreated, it can progress to periodontitis, where the bone and fibres holding teeth in place are destroyed. Research also links periodontal disease to cardiovascular disease, diabetes, and other systemic conditions.",
    whoNeedsIt:
      "Anyone experiencing bleeding gums, persistent bad breath, gum recession, or loose teeth should seek periodontal assessment promptly. Those with risk factors including smoking, diabetes, pregnancy, or a family history of gum disease benefit from more frequent monitoring even without obvious symptoms.",
    procedure: [
      {
        step: 1,
        title: "Periodontal Assessment",
        description:
          "A comprehensive charting of pocket depths around every tooth, combined with X-rays, assesses the extent of bone loss and disease activity.",
      },
      {
        step: 2,
        title: "Oral Hygiene Instruction",
        description:
          "Personalised instruction on brushing technique, interdental cleaning, and use of adjunctive aids is fundamental to successful treatment.",
      },
      {
        step: 3,
        title: "Root Surface Debridement",
        description:
          "Deep cleaning under local anaesthesia removes bacterial deposits from below the gum line where brushing cannot reach.",
      },
      {
        step: 4,
        title: "Reassessment",
        description:
          "Six weeks after treatment, we reassess pocket depths to measure response and determine whether any further intervention is required.",
      },
      {
        step: 5,
        title: "Maintenance Programme",
        description:
          "Tailored recall appointments at intervals of 3–4 months maintain stability and prevent disease recurrence.",
      },
    ],
    benefits: [
      "Halts progression of gum disease",
      "Reduces risk of tooth loss",
      "Freshens breath significantly",
      "Reduces systemic inflammation linked to gum disease",
      "Improves appearance of gums",
      "Prevents recurrence through tailored maintenance",
    ],
    faqs: [
      {
        q: "Is gum disease treatment painful?",
        a: "Root surface debridement is performed under local anaesthesia and is well-tolerated. Some tenderness for 2–3 days afterwards is normal and managed easily with over-the-counter pain relief.",
      },
      {
        q: "Can gum disease be cured?",
        a: "Gingivitis is fully reversible with professional treatment and improved home care. Periodontitis can be effectively controlled and stabilised, but requires ongoing maintenance to prevent recurrence.",
      },
      {
        q: "Is gum disease linked to heart disease?",
        a: "Research has established a significant association between periodontal disease and cardiovascular conditions, including heart attack and stroke. Treating gum disease may have benefits beyond your oral health.",
      },
    ],
    duration: "60–90 minutes per session",
    priceRange: "£200–£1,200",
    icon: "M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z",
    relatedServices: ["general-dentistry", "oral-surgery", "dental-implants"],
  },
  {
    id: 10,
    slug: "emergency-dentistry",
    name: "Emergency Dentistry",
    tagline: "When It Can't Wait",
    shortDescription:
      "Same-day emergency appointments for dental pain, trauma, and urgent problems — because some things simply cannot wait.",
    fullDescription:
      "Dental emergencies don't follow a schedule. Whether you've knocked out a tooth, broken a restoration, or are suffering from acute dental pain, our emergency dental service provides prompt, expert care to relieve discomfort and address the underlying problem as quickly as possible. We reserve same-day appointments specifically for emergency cases.",
    whatIsIt:
      "Emergency dentistry covers the urgent diagnosis and treatment of acute dental problems that require immediate attention. This includes severe toothache, dental abscesses, knocked-out or displaced teeth, broken teeth or restorations, lost crowns or fillings, and soft tissue injuries to the mouth.",
    whoNeedsIt:
      "Anyone experiencing sudden severe dental pain, visible tooth damage, dental trauma, facial swelling, or a dental abscess should contact us immediately. Time is critical in certain situations — a knocked-out tooth, for example, has the best chance of being saved if replanted within 30 minutes.",
    procedure: [
      {
        step: 1,
        title: "Immediate Triage",
        description:
          "Call us and describe your symptoms. Our team will assess urgency and book you in at the earliest available emergency slot, often same-day.",
      },
      {
        step: 2,
        title: "Pain Relief",
        description:
          "Your immediate comfort is our first priority. Local anaesthesia and appropriate medication are administered to bring rapid relief.",
      },
      {
        step: 3,
        title: "Diagnosis",
        description:
          "Digital X-rays and clinical examination identify the cause of the problem and the best course of immediate treatment.",
      },
      {
        step: 4,
        title: "Emergency Treatment",
        description:
          "Immediate treatment is carried out — whether that is drainage of an abscess, a temporary restoration, splinting a displaced tooth, or emergency extraction.",
      },
      {
        step: 5,
        title: "Follow-up Planning",
        description:
          "A definitive treatment plan is arranged to address the underlying cause and restore the tooth to full health.",
      },
    ],
    benefits: [
      "Same-day appointments available",
      "Immediate pain relief",
      "Expert diagnosis and urgent treatment",
      "Available for registered and new patients",
      "Out-of-hours telephone advice",
      "Follow-up care to prevent recurrence",
    ],
    faqs: [
      {
        q: "What should I do if a tooth is knocked out?",
        a: "Pick up the tooth by the crown (not the root), gently rinse it without scrubbing, and try to reinsert it into the socket. If that is not possible, keep it in milk or saliva and call us immediately.",
      },
      {
        q: "How do I know if my toothache is a dental emergency?",
        a: "Severe, persistent pain; pain with fever or facial swelling; or pain following trauma should always be treated as an emergency. Do not wait to see if it resolves on its own.",
      },
      {
        q: "Can I walk in without an appointment?",
        a: "We strongly recommend calling ahead so we can prepare for your arrival and ensure the right clinician and equipment are ready. We will always do our best to see emergency cases as quickly as possible.",
      },
    ],
    duration: "30–90 minutes",
    priceRange: "£100–£500 (initial emergency appointment)",
    icon: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z",
    relatedServices: ["root-canal", "oral-surgery", "crowns-bridges"],
  },
  {
    id: 11,
    slug: "dentures",
    name: "Dentures",
    tagline: "Restore Your Smile. Reclaim Your Life.",
    shortDescription:
      "Custom-crafted dentures that restore a natural appearance and full function, designed for exceptional comfort and fit.",
    fullDescription:
      "Modern dentures bear little resemblance to the ill-fitting, artificial-looking appliances of the past. Our bespoke dentures are crafted by master dental technicians using premium materials that replicate the natural beauty of teeth and gums. Whether you require a complete denture or a partial appliance to replace selected teeth, we design each solution for optimal aesthetics, comfort, and function.",
    whatIsIt:
      "Dentures are removable prosthetic appliances that replace missing teeth. Complete dentures replace all teeth in the upper or lower arch, while partial dentures replace several missing teeth within a natural dentition. Implant-retained dentures offer a more stable, secure alternative that eliminates movement and irritation.",
    whoNeedsIt:
      "Dentures are suitable for patients who have lost multiple or all of their teeth due to decay, gum disease, or trauma. They restore chewing ability, support facial muscles to prevent the sunken appearance associated with tooth loss, and allow patients to speak and smile with full confidence.",
    procedure: [
      {
        step: 1,
        title: "Consultation & Assessment",
        description:
          "We assess your existing teeth, gum health, bone structure, and facial anatomy to design the optimal denture solution.",
      },
      {
        step: 2,
        title: "Impressions & Records",
        description:
          "Precise impressions and bite records are taken and sent to our specialist dental laboratory for fabrication.",
      },
      {
        step: 3,
        title: "Trial Denture",
        description:
          "A wax trial denture allows you to evaluate the appearance and fit before the final appliance is completed.",
      },
      {
        step: 4,
        title: "Fitting & Adjustment",
        description:
          "Your finished denture is fitted and carefully adjusted to ensure an even bite and maximum comfort.",
      },
    ],
    benefits: [
      "Restores chewing ability and nutrition",
      "Improves speech affected by tooth loss",
      "Supports facial muscles and prevents sagging",
      "Custom aesthetics for a natural appearance",
      "Implant-retained options for greater stability",
      "Affordable compared to implant-based alternatives",
    ],
    faqs: [
      {
        q: "Will my dentures look natural?",
        a: "Modern denture teeth are made from high-quality acrylic or porcelain and are available in a wide range of shades and shapes. Our technicians customise each denture to suit your facial features and skin tone.",
      },
      {
        q: "How long do dentures take to get used to?",
        a: "Most patients adapt within 4–8 weeks. Some initial difficulty with speaking and eating is normal and improves with practice.",
      },
      {
        q: "How do I care for my dentures?",
        a: "Remove and clean your dentures after eating using a soft brush and denture cleaner. Soak them overnight in a denture solution and always handle them over a folded towel or basin of water in case of dropping.",
      },
    ],
    duration: "Multiple appointments over 4–6 weeks",
    priceRange: "£900–£3,500",
    icon: "M12 3a9 9 0 1 0 0 18A9 9 0 0 0 12 3zM8.5 8.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm7 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm-7 6.5h7c-.5 2-2 3-3.5 3s-3-1-3.5-3z",
    relatedServices: ["dental-implants", "oral-surgery", "crowns-bridges"],
  },
  {
    id: 12,
    slug: "crowns-bridges",
    name: "Crowns & Bridges",
    tagline: "Strength and Beauty in Perfect Harmony",
    shortDescription:
      "Precision-crafted ceramic crowns and bridges that restore damaged or missing teeth with exceptional durability and aesthetics.",
    fullDescription:
      "Dental crowns and bridges are among the most versatile and long-lasting restorative treatments in dentistry. Crafted from high-strength zirconia or layered porcelain, our restorations are designed to blend seamlessly with your natural teeth while providing the structural integrity needed for years of reliable function.",
    whatIsIt:
      "A crown is a custom-made cap that fits over a damaged, weakened, or aesthetically compromised tooth, restoring its shape, size, and strength. A bridge uses crowns on adjacent teeth as anchors to suspend a false tooth (pontic) in the gap left by a missing tooth, bridging the space without the need for surgery.",
    whoNeedsIt:
      "Crowns are recommended for teeth that are cracked, severely decayed, fractured, or following root canal treatment. Bridges are an option for patients missing one or two adjacent teeth where implant surgery is not preferred. Both treatments are also used as the final restoration on dental implants.",
    procedure: [
      {
        step: 1,
        title: "Assessment & Planning",
        description:
          "We evaluate the affected teeth, take digital impressions and photographs, and select the appropriate material for your restoration.",
      },
      {
        step: 2,
        title: "Tooth Preparation",
        description:
          "The tooth is carefully shaped to receive the crown. A temporary crown is placed to protect the tooth while the permanent restoration is fabricated.",
      },
      {
        step: 3,
        title: "Laboratory Fabrication",
        description:
          "Your crown or bridge is crafted by our dental ceramists using premium zirconia or porcelain, matched precisely to your natural tooth shade.",
      },
      {
        step: 4,
        title: "Fitting & Cementation",
        description:
          "The finished restoration is tried in, adjusted for fit and bite, and permanently cemented using dental-grade adhesive.",
      },
    ],
    benefits: [
      "Restores full strength to damaged teeth",
      "Natural appearance with premium ceramics",
      "Durable — lasting 15–25 years with care",
      "Protects teeth after root canal treatment",
      "Bridges replace teeth without implant surgery",
      "Colour-matched to surrounding teeth",
    ],
    faqs: [
      {
        q: "How long do crowns last?",
        a: "With proper care, modern zirconia and ceramic crowns typically last 15–25 years. Avoiding hard foods and wearing a night guard if you grind will extend their lifespan significantly.",
      },
      {
        q: "Does crown preparation hurt?",
        a: "The procedure is carried out under local anaesthesia. You should feel pressure but no pain during preparation. Sensitivity for a few days afterwards is normal.",
      },
      {
        q: "What is the difference between a crown and a veneer?",
        a: "A veneer covers only the front surface of a tooth and requires minimal preparation. A crown encases the entire tooth and is used when greater structural protection is needed.",
      },
    ],
    duration: "2 appointments over 1–2 weeks",
    priceRange: "£800–£1,800 per unit",
    icon: "M5 3h14l-1 9H6L5 3zm0 0L3 1M19 3l2-2M6 12l-2 9h16l-2-9",
    relatedServices: ["dental-implants", "root-canal", "veneers"],
  },
  {
    id: 13,
    slug: "invisalign",
    name: "Invisalign",
    tagline: "Straighten Discreetly. Transform Confidently.",
    shortDescription:
      "The world's leading clear aligner system — virtually invisible orthodontics that fit seamlessly into your lifestyle.",
    fullDescription:
      "Invisalign uses a series of custom-manufactured, virtually invisible aligners to gently and precisely move your teeth into their ideal positions. Each aligner is worn for approximately two weeks before progressing to the next in the series. With no metal brackets or wires, Invisalign is the orthodontic choice for adults and teenagers who want to transform their smile without compromising their appearance during treatment.",
    whatIsIt:
      "Invisalign clear aligners are made from SmartTrack® material — a proprietary, BPA-free thermoplastic that applies consistent, controlled force to move teeth. Treatment is planned using ClinCheck® software, which creates a precise 3D simulation of your entire treatment journey and the final result before you begin.",
    whoNeedsIt:
      "Invisalign is suitable for treating a wide range of alignment issues including crowding, spacing, overbite, underbite, crossbite, and open bite in both adults and teenagers. It is particularly popular with professionals and adults who want the benefits of orthodontic treatment without the visual impact of traditional braces.",
    procedure: [
      {
        step: 1,
        title: "iTero Digital Scan",
        description:
          "We take a precise 3D digital scan of your teeth using the iTero Element scanner — no messy impressions required.",
      },
      {
        step: 2,
        title: "ClinCheck Treatment Simulation",
        description:
          "Your personalised ClinCheck simulation shows you exactly how your teeth will move and what your smile will look like at the end of treatment.",
      },
      {
        step: 3,
        title: "Aligner Manufacture",
        description:
          "Your custom aligners are precision-manufactured in Invisalign's facilities and delivered to our clinic typically within 2–3 weeks.",
      },
      {
        step: 4,
        title: "Aligner Fitting",
        description:
          "Small tooth-coloured attachments may be bonded to certain teeth to help the aligners grip and apply the precise movements required.",
      },
      {
        step: 5,
        title: "Progress Reviews",
        description:
          "Regular check-ups every 6–8 weeks allow us to monitor progress, supply new aligner sets, and make any necessary refinements.",
      },
    ],
    benefits: [
      "Virtually invisible during treatment",
      "Removable for eating and special occasions",
      "No dietary restrictions",
      "Easier to maintain oral hygiene",
      "Predictable outcomes with digital planning",
      "Comfortable with no sharp brackets or wires",
    ],
    faqs: [
      {
        q: "How long does Invisalign treatment take?",
        a: "Treatment time varies from 6 months for mild cases to 18–24 months for more complex alignment issues. Your ClinCheck simulation will provide an accurate timeline for your specific case.",
      },
      {
        q: "How many hours a day must I wear the aligners?",
        a: "Aligners must be worn for 20–22 hours per day to be effective. They are only removed for eating, drinking anything other than water, and oral hygiene.",
      },
      {
        q: "Is Invisalign as effective as braces?",
        a: "For mild to moderate orthodontic cases, Invisalign achieves comparable results to traditional braces. For very complex cases, braces may offer greater control — we will advise which option is most appropriate for your needs.",
      },
    ],
    duration: "6–24 months",
    priceRange: "£2,500–£5,500",
    icon: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z",
    relatedServices: ["orthodontics", "smile-makeover", "veneers"],
  },
  {
    id: 14,
    slug: "smile-makeover",
    name: "Smile Makeover",
    tagline: "Your Dream Smile, Masterfully Crafted",
    shortDescription:
      "A bespoke combination of cosmetic treatments designed to create your perfect smile — beautiful, natural, and uniquely yours.",
    fullDescription:
      "A smile makeover is the ultimate expression of cosmetic dentistry. Rather than a single treatment, it is a carefully orchestrated combination of procedures — veneers, whitening, orthodontics, contouring, and more — brought together by our cosmetic dental team to create a smile that is as individual as you are. Every decision, from tooth shape to shade, is guided by your facial features, skin tone, and personal aesthetic.",
    whatIsIt:
      "A smile makeover is a comprehensive cosmetic treatment plan that addresses multiple aspects of your smile simultaneously. Using digital smile design technology, we visualise and plan the transformation before touching a single tooth, ensuring that you have a clear picture of the expected outcome and full input into every design decision.",
    whoNeedsIt:
      "A smile makeover is for anyone who feels self-conscious about their smile and wishes to make a lasting change. Whether you have discoloured, chipped, misaligned, worn, or gapped teeth — or simply want a more youthful, vibrant appearance — a personalised makeover plan can address all of your concerns in a coherent, phased treatment journey.",
    procedure: [
      {
        step: 1,
        title: "Smile Design Consultation",
        description:
          "An in-depth discussion of your goals, facial analysis, photographs, and digital smile design to co-create your vision.",
      },
      {
        step: 2,
        title: "Diagnostic Wax-Up",
        description:
          "A physical mock-up of your future smile on a plaster model allows you to evaluate and approve the proposed changes in three dimensions.",
      },
      {
        step: 3,
        title: "Trial Smile",
        description:
          "Composite resin is placed temporarily over your existing teeth to give you a preview of your new smile in your own mouth before any preparation.",
      },
      {
        step: 4,
        title: "Treatment Sequence",
        description:
          "Treatments are carried out in the optimal clinical sequence — typically orthodontics or implants first, followed by restorations, then whitening and final finishing.",
      },
      {
        step: 5,
        title: "Final Reveal",
        description:
          "The completion of your smile makeover, with professional photography to capture the transformation and a maintenance plan to protect your investment.",
      },
    ],
    benefits: [
      "Comprehensive transformation in a coordinated plan",
      "Digital smile design previews your result in advance",
      "Addresses multiple concerns simultaneously",
      "Tailored to your facial features and preferences",
      "Phased treatment to fit your timeline and budget",
      "Life-changing impact on confidence and wellbeing",
    ],
    faqs: [
      {
        q: "How long does a smile makeover take?",
        a: "Depending on the treatments involved, a smile makeover can take anywhere from a few weeks (whitening and veneers only) to 18 months (including orthodontics or implants).",
      },
      {
        q: "How much does a smile makeover cost?",
        a: "Because every makeover is unique, costs vary considerably. Following your consultation and treatment plan, we provide a fully itemised quote. Interest-free finance options are available.",
      },
      {
        q: "Will my new smile look natural?",
        a: "Natural aesthetics are the cornerstone of our philosophy. We use digital design, trial smiles, and master ceramists to ensure results that enhance your individual beauty rather than create an artificial appearance.",
      },
    ],
    duration: "Varies — weeks to months depending on treatments",
    priceRange: "£3,000–£25,000+",
    icon: "M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z",
    relatedServices: ["veneers", "teeth-whitening", "invisalign"],
  },
];
