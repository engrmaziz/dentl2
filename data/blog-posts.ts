import type { BlogPost } from "@/types";

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    slug: "the-science-behind-a-perfect-smile",
    title: "The Science Behind a Perfect Smile",
    excerpt:
      "Modern cosmetic dentistry is as much a science as it is an art. Discover the optical principles, material innovations, and digital technologies that allow today's dentists to create smiles of extraordinary beauty.",
    content: `<p>When we describe a smile as "perfect," we are rarely thinking about the chemistry of dental ceramics or the mathematics of facial proportion — yet these are precisely the forces at work when a skilled cosmetic dentist creates a transformative result. The most beautiful smiles are not accidents; they are the product of rigorous science applied with an artist's sensibility.</p>

<h2>The Golden Proportion</h2>
<p>The golden ratio — approximately 1:1.618 — appears throughout nature and has been used in art and architecture for millennia. In dentistry, it describes the ideal width relationships between successive teeth as viewed from the front. The central incisors are the widest visible teeth, each successive tooth appears narrower by a factor of 0.618, creating a harmonious visual taper toward the back of the mouth. Dentists trained in smile design use this principle to calculate the ideal width of each tooth when fabricating veneers or planning orthodontic treatment.</p>

<h2>The Optics of Enamel</h2>
<p>Natural tooth enamel is remarkable material. It is semi-translucent, allowing light to penetrate to the underlying dentine and reflect back in a way that gives teeth their characteristic depth and warmth. The most lifelike dental restorations — whether ceramic veneers, zirconia crowns, or composite bonding — must replicate this optical behaviour. Modern dental ceramics are layered by hand, with a more opaque base layer mimicking dentine and a translucent surface layer mimicking enamel, creating the same three-dimensional luminosity as a natural tooth.</p>

<h2>Digital Smile Design</h2>
<p>Perhaps the most significant technological advance in cosmetic dentistry in the past decade is digital smile design (DSD). Using high-resolution clinical photography and specialised software, the dentist maps the patient's facial features, lip line, and gum architecture onto a digital canvas. Proposed tooth shapes, sizes, and positions are overlaid and adjusted in real time, allowing the patient to preview their result before any treatment begins. The design is then transferred to the dental laboratory, where it guides the fabrication of the final restorations with sub-millimetre precision.</p>

<h2>Colour Science</h2>
<p>Tooth colour is described using three dimensions: hue (the basic colour, ranging from yellow to grey), chroma (the intensity of that colour), and value (brightness from dark to light). Research consistently shows that value is the most visually significant dimension — brighter teeth appear more attractive regardless of their precise hue. This is why professional whitening, which primarily increases value, has such a dramatic visual impact. When ceramic restorations are fabricated, technicians use spectrophotometric analysis to precisely match the colour of adjacent natural teeth, eliminating guesswork from what was once a purely subjective process.</p>

<h2>The Harmony of Face and Smile</h2>
<p>A beautiful smile does not exist in isolation — it must harmonise with the face surrounding it. The incisal edges of the upper front teeth should follow the curve of the lower lip when smiling. The gum line should be symmetrical. The midline of the upper teeth should ideally coincide with the centre of the face. These relationships are assessed during the consultation and inform every design decision. The result, when all elements are considered together, is a smile that looks as if it always belonged — because scientifically, it does.</p>`,
    author: "Dr. Sophia Harrington",
    category: "Cosmetic Dentistry",
    readTime: 6,
    date: "2024-11-20",
    tags: ["cosmetic dentistry", "smile design", "veneers", "dental science"],
    featuredImage: "linear-gradient(135deg, #B8956A 0%, #0A1628 100%)",
  },
  {
    id: 2,
    slug: "why-preventive-care-saves-you-money",
    title: "Why Preventive Care Saves You Money",
    excerpt:
      "Skipping your six-month check-up might feel like a saving, but the true cost of neglected dental care is invariably far higher. Here is the financial and clinical case for investing in prevention.",
    content: `<p>In an era of rising living costs, it is tempting to deprioritise dental appointments — particularly when nothing is visibly wrong. Yet this short-term thinking carries a long-term price tag that is invariably far higher than the cost of regular preventive care. Understanding the economics of oral health is one of the most compelling arguments for keeping your six-monthly appointments.</p>

<h2>The Cost Cascade</h2>
<p>Dental disease does not stand still. A small cavity detected at a routine check-up can be treated with a simple filling costing £80–£150. Left undetected for another twelve months, that same cavity may have progressed to involve the pulp, requiring root canal treatment and a crown — a combined cost of £1,400–£2,200. If the tooth is ultimately lost and replaced with an implant, the total expenditure could reach £3,500–£4,500. The arithmetic is compelling: one missed appointment can multiply the cost of treatment ten-fold.</p>

<h2>What a Check-up Actually Does</h2>
<p>A professional dental examination is considerably more than a quick look in the mouth. Your dentist is screening for early decay, gum disease, bite problems, erosion, oral cancer, and signs of systemic conditions including diabetes and acid reflux that can manifest in the mouth. Digital X-rays reveal decay between teeth and bone loss around roots that is entirely invisible clinically. The ability to intervene at the earliest possible stage is entirely dependent on attending regular appointments.</p>

<h2>The True Value of Professional Cleaning</h2>
<p>Even perfect home brushing cannot remove calculus (tartar) — the hardened mineral deposit that accumulates on tooth surfaces over time. Calculus is the primary driver of gum disease, which is itself the leading cause of tooth loss in adults. Professional cleaning removes this deposit before it causes irreversible damage, preserving the bone and tissue that support your teeth. Treating advanced gum disease requires specialist periodontal therapy costing hundreds to thousands of pounds — all of which is largely preventable with biannual hygiene appointments.</p>

<h2>Time is Also Money</h2>
<p>Dental emergencies — abscesses, broken teeth, acute pain — require urgent appointments, often at short notice and at a premium cost. They also cause lost working time, disrupted plans, and considerable personal distress. Patients who attend regularly simply have fewer dental emergencies; problems are caught and addressed before they become urgent.</p>

<h2>Building a Relationship with Your Dentist</h2>
<p>Perhaps the least quantifiable but most valuable aspect of regular preventive care is the relationship it builds between patient and dentist. When your dentist knows your mouth, your history, and your risk factors, they can make more accurate diagnoses and more targeted treatment recommendations. This familiarity reduces unnecessary treatment and ensures that when action is needed, it is taken at exactly the right moment — neither too soon nor too late. Preventive dentistry is not just good medicine; it is excellent financial planning.</p>`,
    author: "Dr. Amelia Forsythe",
    category: "Preventive Care",
    readTime: 5,
    date: "2024-10-14",
    tags: ["preventive dentistry", "oral health", "dental hygiene", "check-ups"],
    featuredImage: "linear-gradient(135deg, #2E7D5E 0%, #0A1628 100%)",
  },
  {
    id: 3,
    slug: "understanding-dental-implants-a-complete-guide",
    title: "Understanding Dental Implants: A Complete Guide",
    excerpt:
      "Dental implants have revolutionised the treatment of tooth loss. This comprehensive guide covers everything you need to know — from the science of osseointegration to the surgical process and long-term outcomes.",
    content: `<p>The development of dental implantology over the past five decades represents one of the most significant advances in modern dentistry. Where once tooth loss meant dentures or bridges, today a lost tooth can be replaced with a permanent, natural-feeling implant that preserves bone, restores full function, and lasts a lifetime. Yet for many patients, implants remain somewhat mysterious. This guide demystifies the process from start to finish.</p>

<h2>What Exactly is a Dental Implant?</h2>
<p>A dental implant is a small titanium screw — typically 3–5mm in diameter and 8–16mm in length — that is surgically placed into the jawbone to act as an artificial tooth root. Titanium is chosen because of its exceptional biocompatibility; the body does not reject it. Over a period of 3–6 months following placement, a biological process called osseointegration occurs, during which the bone cells grow directly onto and around the implant surface, anchoring it as firmly as a natural root. Once integrated, a ceramic crown is attached via a connecting piece called an abutment.</p>

<h2>Who is Suitable for Implants?</h2>
<p>The ideal implant candidate is an adult with good general health, healthy gums, and sufficient jawbone volume to accommodate the implant. A 3D CBCT scan is essential to assess bone quantity and quality precisely. Patients who smoke, have uncontrolled diabetes, or are taking certain medications (including some bisphosphonates) require careful assessment as these factors can impair healing. Most patients who have been told they are "not suitable" for implants can actually proceed after appropriate preparatory treatment such as bone grafting or sinus augmentation.</p>

<h2>The Implant Process Step by Step</h2>
<p>The journey begins with a comprehensive consultation including 3D imaging and treatment planning. On the day of surgery, local anaesthesia is administered and the implant is placed through a small incision in the gum. The site is then closed and allowed to heal. During the osseointegration period, a temporary restoration maintains aesthetics and function. Once the implant has fully integrated — confirmed radiographically — the permanent ceramic crown is fitted. Most patients are surprised by how straightforward and comfortable the entire process is.</p>

<h2>Why Implants Outperform the Alternatives</h2>
<p>Traditional bridges require the grinding down of healthy adjacent teeth to serve as anchor points — a permanent and irreversible alteration to perfectly sound tooth structure. Removable dentures can move, cause sore spots, and require adhesives. Implants, by contrast, are entirely self-supporting, require no modification of adjacent teeth, and stimulate the jawbone to prevent the bone resorption that invariably follows tooth loss. This preservation of bone maintains the natural contours of the face, preventing the sunken appearance associated with long-term tooth loss.</p>

<h2>Longevity and Care</h2>
<p>Studies with 20+ year follow-up demonstrate implant survival rates exceeding 95%. The implant itself — if properly integrated — can last a lifetime. The crown component typically requires replacement after 15–20 years, in the same way natural teeth may eventually need restorations renewed. Daily brushing, flossing with interdental brushes, and regular professional maintenance are all that is required. For patients who invest in implants, the long-term value — aesthetic, functional, and economic — is extraordinary.</p>`,
    author: "Dr. James Whitfield",
    category: "Implants",
    readTime: 7,
    date: "2024-09-02",
    tags: ["dental implants", "tooth loss", "osseointegration", "oral surgery"],
    featuredImage: "linear-gradient(135deg, #0A1628 0%, #1a3a5c 100%)",
  },
  {
    id: 4,
    slug: "invisalign-vs-traditional-braces",
    title: "Invisalign vs Traditional Braces: Which is Right for You?",
    excerpt:
      "Both Invisalign and traditional braces can deliver beautiful results — but the right choice depends on your clinical needs, lifestyle, and personal preferences. Here is an honest comparison.",
    content: `<p>The question we hear most often in our orthodontic consultations is some variation of: "Can I have the invisible ones?" The desire for discreet orthodontic treatment is entirely understandable, particularly for adult patients. However, the choice between Invisalign and traditional braces is not purely aesthetic — it involves clinical considerations, compliance requirements, and lifestyle factors that must all be weighed carefully.</p>

<h2>How Each System Works</h2>
<p>Traditional braces use metal or ceramic brackets bonded to the teeth, connected by an archwire that is periodically tightened to apply controlled force and move teeth progressively into their target positions. Invisalign uses a series of custom-manufactured clear aligners — each slightly different from the last — that are worn over the teeth and changed approximately every two weeks, cumulatively moving teeth through the planned sequence of movements. Both systems work; they simply apply force in different ways.</p>

<h2>Clinical Effectiveness: What Can Each System Treat?</h2>
<p>Traditional braces offer the greatest versatility. They are the preferred choice for severe crowding, complex bite corrections (including significant overbites and underbites), and cases where multiple teeth need to be moved in three dimensions simultaneously. The fixed appliance gives the orthodontist precise control at all times. Invisalign has advanced considerably and can now treat a much broader range of cases than was possible a decade ago. For mild to moderate crowding, spacing, and many bite issues, it delivers comparable results to braces. However, very complex cases — particularly those involving significant vertical or rotational movements — may still be more predictably managed with fixed appliances.</p>

<h2>Compliance: The Critical Variable</h2>
<p>This is where the comparison becomes personal. Braces are fixed and work continuously — the patient's compliance level has no bearing on the appliance doing its job. Invisalign aligners must be worn for 20–22 hours per day to be effective. If they are removed frequently or forgotten, treatment will not progress as planned and the total treatment time will extend. For highly disciplined adults, this is rarely an issue. For teenagers — or adults who are tempted to leave aligners out for social occasions — braces may actually deliver more reliable results.</p>

<h2>Lifestyle and Aesthetics</h2>
<p>Invisalign's near-invisibility during treatment is its defining advantage for adult patients. Aligners are also removed for eating and drinking, meaning there are no dietary restrictions — a significant quality-of-life advantage over braces, which prohibit hard, sticky, or chewy foods. Oral hygiene is also simpler with aligners, as brushing and flossing proceed entirely normally. With fixed braces, meticulous cleaning around brackets and wires is essential and often more time-consuming.</p>

<h2>Cost Considerations</h2>
<p>Invisalign treatment is generally comparable in cost to fixed braces, with both systems ranging from approximately £2,500 to £6,000 depending on the complexity of treatment. Some straightforward cases may be treated more quickly and economically with one system over the other. The best way to determine cost is to attend an orthodontic consultation, at which point a precise quote can be provided based on your specific clinical needs.</p>

<h2>Our Recommendation</h2>
<p>The honest answer is that the right system is the one that best suits your clinical needs, compliance profile, and personal circumstances. Our orthodontists will always recommend the approach most likely to achieve the best possible result for you specifically — and in many cases, either system would work equally well. The consultation is the starting point: come and see us, and we will give you our honest assessment.</p>`,
    author: "Dr. Oliver Crane",
    category: "Orthodontics",
    readTime: 7,
    date: "2024-08-05",
    tags: ["invisalign", "braces", "orthodontics", "clear aligners", "teeth straightening"],
    featuredImage: "linear-gradient(135deg, #2E7D5E 0%, #7B4F9E 100%)",
  },
  {
    id: 5,
    slug: "oral-health-and-overall-wellbeing",
    title: "The Link Between Oral Health and Overall Wellbeing",
    excerpt:
      "The mouth is a window to the body. A growing body of research reveals profound connections between oral health and systemic conditions including heart disease, diabetes, and mental health.",
    content: `<p>For most of history, dentistry and medicine were considered separate disciplines, treating different organs that happened to share a body. This artificial division is now being dismantled by a growing body of evidence demonstrating that the health of the mouth is intimately — and bi-directionally — linked to the health of the whole person. Understanding these connections is not just academically interesting; it has real implications for how we approach both dental and medical care.</p>

<h2>The Mouth as a Microbial Ecosystem</h2>
<p>The human mouth contains over 700 species of bacteria, making it one of the most complex microbial environments in the body. In a healthy mouth, this ecosystem is in balance — the beneficial bacteria keep potentially harmful species in check. Gum disease disrupts this balance, allowing pathogenic bacteria to flourish. These bacteria and the inflammatory molecules they trigger do not remain confined to the mouth; they enter the bloodstream and can travel to virtually every organ in the body.</p>

<h2>Gum Disease and Cardiovascular Health</h2>
<p>The association between periodontal disease and cardiovascular conditions — including heart attack, stroke, and atherosclerosis — is one of the most robustly evidenced relationships in medicine. Bacteria from infected gum tissue have been found in arterial plaques. The chronic systemic inflammation driven by periodontal disease contributes to the inflammatory processes that underpin cardiovascular disease. Multiple large-scale studies have found that people with severe gum disease have a significantly elevated risk of heart attack and stroke. Treating gum disease measurably reduces systemic inflammatory markers.</p>

<h2>The Diabetes Connection</h2>
<p>The relationship between diabetes and periodontal disease is uniquely bidirectional. Diabetes impairs the body's ability to fight infection, making the gums more vulnerable to disease. Conversely, gum disease causes blood glucose levels to fluctuate and be harder to control. Patients with both conditions are caught in a damaging cycle that must be addressed on both fronts simultaneously. Clinical evidence now supports gum disease treatment as a component of diabetes management — with demonstrated improvements in HbA1c (the key marker of long-term blood glucose control) following periodontal therapy.</p>

<h2>Oral Health and Mental Wellbeing</h2>
<p>The psychological impact of dental problems is often underestimated. Poor dental aesthetics — crooked, discoloured, or missing teeth — have a well-documented negative effect on self-esteem, social confidence, and quality of life. People with dental anxiety frequently avoid care until problems are severe, entering a cycle of deteriorating oral health and escalating fear. Conversely, research consistently shows that cosmetic dental treatment produces significant improvements in psychological wellbeing and social confidence. A healthy, attractive smile is not a vanity; it is a component of holistic health.</p>

<h2>Pregnancy and Oral Health</h2>
<p>Hormonal changes during pregnancy increase susceptibility to gum inflammation (pregnancy gingivitis), and severe gum disease has been associated with adverse pregnancy outcomes including preterm birth and low birth weight. Dental care is safe throughout pregnancy and is specifically recommended during this period. Pregnant patients should inform their dental team so that appropriate preventive measures can be taken and treatment timed appropriately.</p>

<h2>The Practical Takeaway</h2>
<p>Your mouth is not separate from your body — it is the gateway to it. Investing in your oral health is investing in your cardiovascular health, metabolic health, mental wellbeing, and overall quality of life. Regular dental visits are not a luxury or a dental marketing message; they are a component of comprehensive healthcare that the evidence firmly supports.</p>`,
    author: "Dr. Priya Nair",
    category: "Health & Wellbeing",
    readTime: 8,
    date: "2024-07-18",
    tags: ["oral health", "systemic health", "gum disease", "cardiovascular health", "diabetes"],
    featuredImage: "linear-gradient(135deg, #7B4F9E 0%, #B8956A 100%)",
  },
  {
    id: 6,
    slug: "how-to-choose-the-right-toothbrush-and-toothpaste",
    title: "How to Choose the Right Toothbrush and Toothpaste",
    excerpt:
      "The dental care aisle can be overwhelming. Cut through the marketing noise with this evidence-based guide to choosing the tools that will genuinely make a difference to your oral health.",
    content: `<p>Stand in any pharmacy dental aisle and you will be confronted by a bewildering array of toothbrushes, electric devices, whitening pastes, sensitivity formulas, charcoal products, and herbal alternatives — all promising superior results. The reality, as with much in healthcare, is rather simpler. Good oral hygiene does not require expensive gadgets or exotic ingredients; it requires the right technique with appropriate tools used consistently. Here is what the evidence actually supports.</p>

<h2>Manual vs Electric: What the Evidence Says</h2>
<p>Multiple systematic reviews, including those published by the Cochrane Collaboration — the gold standard of medical evidence synthesis — have concluded that electric toothbrushes, particularly oscillating-rotating models (such as those made by Oral-B), reduce plaque and gingivitis more effectively than manual brushing. The reason is straightforward: the brush does the work of the rotational cleaning motion, reducing the technique-dependence of the process. For patients with limited dexterity, arthritis, or a tendency to brush incorrectly, an electric toothbrush provides a consistent, effective clean that manual brushing often does not.</p>

<h2>Choosing a Manual Toothbrush</h2>
<p>If you prefer a manual brush, always choose one with soft bristles. Medium and hard bristle brushes are widely available but are associated with gum recession and enamel abrasion when used with scrubbing technique. The head should be small enough to access the back of the mouth comfortably. Replace your toothbrush every 3 months, or sooner if the bristles are splayed — splayed bristles are significantly less effective at plaque removal.</p>

<h2>Fluoride: Non-Negotiable</h2>
<p>Whatever else is in your toothpaste, fluoride is the one ingredient with unequivocal clinical evidence behind it. Fluoride prevents decay by strengthening enamel and inhibiting the acid-producing bacteria responsible for cavities. For adults, a toothpaste containing at least 1,350–1,500ppm (parts per million) of fluoride is recommended by the Department of Health. Children under three should use a smear of toothpaste containing at least 1,000ppm; children aged three and over can use a pea-sized amount of adult-strength fluoride toothpaste.</p>

<h2>Whitening Toothpastes</h2>
<p>Whitening toothpastes work primarily through mild abrasives that polish away surface staining. They will not change the intrinsic colour of your teeth, nor will they achieve results comparable to professional whitening. For patients with surface staining from coffee or tea, a whitening paste can be a useful maintenance tool alongside professional cleaning. However, some whitening pastes have high abrasivity scores (measured as Relative Dentin Abrasivity or RDA) — look for products with an RDA below 70 if you have sensitive teeth or are concerned about enamel wear.</p>

<h2>Sensitivity Toothpastes</h2>
<p>Sensitivity toothpastes contain active ingredients — typically potassium nitrate or stannous fluoride — that reduce dentine hypersensitivity by blocking the tubules in exposed dentine or desensitising the nerve. They are effective when used consistently over several weeks. However, dental sensitivity can be a sign of an underlying problem (enamel erosion, gum recession, a cracked tooth) that warrants professional assessment. Do not mask sensitivity with toothpaste without first having its cause investigated.</p>

<h2>The Forgotten Step: Interdental Cleaning</h2>
<p>No toothbrush — manual or electric — cleans between teeth. The spaces between teeth account for approximately 40% of tooth surfaces and are where the majority of decay and gum disease begins. Interdental brushes (TePe or equivalent) are more effective than floss for most adults, as they actively remove debris and disrupt bacterial plaque rather than simply displacing it. Choose the largest size that fits comfortably in each space without forcing. This one addition to your routine, done daily, will have a greater impact on your long-term oral health than any premium toothpaste on the market.</p>`,
    author: "Dr. Sophia Harrington",
    category: "Home Care",
    readTime: 6,
    date: "2024-06-24",
    tags: ["oral hygiene", "toothbrush", "toothpaste", "home care", "fluoride"],
    featuredImage: "linear-gradient(135deg, #1a3a5c 0%, #2E7D5E 100%)",
  },
];
