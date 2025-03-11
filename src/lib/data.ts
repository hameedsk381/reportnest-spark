
export interface Article {
  id: string;
  title: string;
  subtitle?: string;
  slug: string;
  category: string;
  image: string;
  author: {
    name: string;
    avatar: string;
  };
  date: string;
  readTime: number;
  excerpt: string;
  content: string;
  featured?: boolean;
  trending?: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
}

export const categories: Category[] = [
  { id: '1', name: 'Technology', slug: 'technology' },
  { id: '2', name: 'Business', slug: 'business' },
  { id: '3', name: 'Politics', slug: 'politics' },
  { id: '4', name: 'Science', slug: 'science' },
  { id: '5', name: 'Health', slug: 'health' },
  { id: '6', name: 'Arts', slug: 'arts' },
];

export const articles: Article[] = [
  {
    id: '1',
    title: 'The Future of AI in Daily Life',
    subtitle: 'How artificial intelligence is reshaping our everyday experiences',
    slug: 'future-ai-daily-life',
    category: 'technology',
    image: 'https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?q=80&w=1200&h=800&auto=format&fit=crop',
    author: {
      name: 'Sarah Johnson',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    },
    date: '2023-11-28',
    readTime: 5,
    excerpt: 'Artificial intelligence is no longer confined to science fiction. It's in our homes, our pockets, and increasingly, in every aspect of our lives.',
    content: `
    <p>Artificial intelligence is no longer confined to science fiction. It's in our homes, our pockets, and increasingly, in every aspect of our lives. From the moment we wake up to smart alarms that monitored our sleep patterns, to the algorithmic recommendations shaping our media consumption, AI is quietly revolutionizing daily life.</p>
    
    <h2>The Invisible Hand</h2>
    <p>What makes this technological revolution distinct is its subtlety. Unlike the visibly transformative technologies of past eras—the automobile, the television, the smartphone—AI often works behind the scenes, invisible but omnipresent.</p>
    
    <figure>
      <img src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200&h=800&auto=format&fit=crop" alt="AI visualization" />
      <figcaption>Visualization of neural networks, representing how AI processes information.</figcaption>
    </figure>
    
    <p>The most profound technologies are those that disappear," wrote Mark Weiser in 1991. "They weave themselves into the fabric of everyday life until they are indistinguishable from it." Three decades later, his vision is materializing through AI.</p>
    
    <h2>Beyond Convenience: The Deeper Impact</h2>
    <p>While many focus on AI's convenience—faster shopping, personalized entertainment, smarter appliances—its deeper impact lies in how it's reshaping human capabilities and relationships.</p>
    
    <p>In healthcare, AI algorithms can now detect certain cancers earlier than human doctors. In education, adaptive learning systems tailor instruction to individual student needs. In environmental science, machine learning models predict climate patterns with increasing accuracy.</p>
    
    <p>These advancements raise profound questions: As AI augments human capabilities, how will it redefine what it means to be skilled? As it mediates more of our interactions, how will it transform human relationships?</p>
    
    <h2>The Road Ahead</h2>
    <p>The future of AI in daily life isn't predetermined. It will be shaped by policy decisions, corporate priorities, and importantly, by public engagement with these technologies.</p>
    
    <p>As AI becomes more integrated into our lives, digital literacy becomes not just a technical skill but a civic necessity. Understanding how algorithms influence our information, opportunities, and decisions is increasingly part of what it means to be an informed citizen.</p>
    
    <p>The most promising future isn't one where AI simply does more for us, but where it empowers us to be more fully human—more creative, connected, and capable of addressing our most pressing challenges.</p>`,
    featured: true,
  },
  {
    id: '2',
    title: 'Global Markets Respond to Economic Policy Shifts',
    slug: 'global-markets-economic-policy',
    category: 'business',
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=1200&h=800&auto=format&fit=crop',
    author: {
      name: 'Michael Chen',
      avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
    },
    date: '2023-11-27',
    readTime: 4,
    excerpt: 'International markets show significant volatility as central banks across major economies announce coordinated policy adjustments.',
    content: `<p>International markets showed significant volatility today as central banks across major economies announced coordinated policy adjustments aimed at addressing persistent inflation concerns while supporting economic growth. The unusual synchronization of these announcements suggests a renewed emphasis on global financial cooperation.</p>
    
    <h2>Coordinated Response</h2>
    <p>The Federal Reserve, European Central Bank, and Bank of Japan issued statements within hours of each other, outlining complementary approaches to monetary policy for the coming quarter. While the specific measures varied according to regional economic conditions, analysts noted the carefully aligned messaging around moderate tightening while maintaining support for key sectors.</p>
    
    <figure>
      <img src="https://images.unsplash.com/photo-1535320903710-d993d3d77d29?q=80&w=1200&h=800&auto=format&fit=crop" alt="Stock market display" />
      <figcaption>Electronic displays showing market reactions to the policy announcements.</figcaption>
    </figure>
    
    <p>"We're seeing a new chapter in international economic coordination," said Dr. Elena Vartanova, chief economist at Global Financial Institute. "These institutions are clearly signaling that they recognize the interconnected nature of current economic challenges."</p>
    
    <h2>Market Reactions</h2>
    <p>Initial market responses reflected cautious optimism, with moderate gains across major indices followed by sector-specific adjustments as traders digested the implications of the policy changes.</p>
    
    <p>Technology and renewable energy stocks showed particularly strong performance, while traditionally inflation-sensitive sectors experienced more measured growth. Currency markets saw the dollar strengthen slightly against a basket of international currencies, though these movements remained within expected parameters.</p>
    
    <h2>Looking Forward</h2>
    <p>Economists remain divided on the long-term implications of these policy shifts. Some view the coordinated approach as a positive sign of international cooperation that could help stabilize global markets during a period of uncertainty.</p>
    
    <p>Others express concern that the synchronized timing might amplify both positive and negative effects of the policies, potentially increasing market sensitivity to future announcements.</p>
    
    <p>"What we're witnessing is an experiment in global economic management," said James Hernandez, senior market strategist at Atlantic Capital Partners. "The next six months will reveal whether this coordinated approach can deliver the soft landing that policymakers are aiming for."</p>`,
    trending: true,
  },
  {
    id: '3',
    title: 'Climate Summit Reaches Breakthrough Agreement',
    slug: 'climate-summit-agreement',
    category: 'politics',
    image: 'https://images.unsplash.com/photo-1565615833231-e8c91ac38125?q=80&w=1200&h=800&auto=format&fit=crop',
    author: {
      name: 'Emma Rodriguez',
      avatar: 'https://randomuser.me/api/portraits/women/33.jpg',
    },
    date: '2023-11-26',
    readTime: 6,
    excerpt: 'After tense negotiations, world leaders have reached a historic agreement on emissions targets and climate finance at the International Climate Summit.',
    content: `<p>After two weeks of tense negotiations that extended into overtime, world leaders at the International Climate Summit have reached what many are calling a historic agreement on emissions targets and climate finance. The breakthrough came in the early hours of Saturday morning, following marathon negotiations that at several points appeared on the verge of collapse.</p>
    
    <h2>A New Framework</h2>
    <p>The agreement, formally titled "The Global Climate Resilience Accord," establishes more ambitious emission reduction targets than previous international agreements, with legally binding commitments from both developed and developing nations. Perhaps most significantly, it creates a new financial framework to support climate adaptation in vulnerable countries.</p>
    
    <figure>
      <img src="https://images.unsplash.com/photo-1516937941344-00b4e0337589?q=80&w=1200&h=800&auto=format&fit=crop" alt="Climate summit" />
      <figcaption>Delegates celebrate as the final agreement is announced at the summit headquarters.</figcaption>
    </figure>
    
    <p>"This represents a genuine paradigm shift in how we approach climate action collectively," said UN Secretary-General Amara Khoury. "For the first time, we have an agreement that balances ambition, equity, and practical implementation pathways."</p>
    
    <h2>Key Provisions</h2>
    <p>The accord includes several provisions that observers are highlighting as particularly significant:</p>
    
    <p>First, a commitment to reach net-zero emissions by 2050 for developed nations and by 2060 for developing economies, with five-year incremental targets that will be independently verified.</p>
    
    <p>Second, the establishment of a $100 billion annual "Climate Resilience Fund" to support adaptation measures in countries most vulnerable to climate impacts, with transparent governance mechanisms.</p>
    
    <p>Third, a framework for technology transfer that addresses intellectual property concerns while accelerating the deployment of green technologies globally.</p>
    
    <h2>Reactions and Next Steps</h2>
    <p>Reactions to the agreement have been largely positive, though not without criticism. Environmental organizations have praised the ambition of the emissions targets while expressing concern about enforcement mechanisms.</p>
    
    <p>Industry representatives have acknowledged the clarity the agreement provides for long-term planning, while some economic analysts question whether the financial commitments are sufficient to meet the challenges ahead.</p>
    
    <p>The agreement will now move to the ratification phase, with signatories having 12 months to formally adopt it through their respective legislative processes. An implementation committee will begin work next month to establish the detailed protocols needed to activate the accord's various mechanisms.</p>`,
    featured: true,
  },
  {
    id: '4',
    title: 'Breakthrough in Quantum Computing Challenges Encryption Standards',
    slug: 'quantum-computing-encryption',
    category: 'technology',
    image: 'https://images.unsplash.com/photo-1639750752877-cd2d9fb21296?q=80&w=1200&h=800&auto=format&fit=crop',
    author: {
      name: 'David Lee',
      avatar: 'https://randomuser.me/api/portraits/men/52.jpg',
    },
    date: '2023-11-25',
    readTime: 7,
    excerpt: 'Recent advances in quantum computing have raised concerns about the security of current encryption methods, prompting urgent industry response.',
    content: `<p>A team of researchers at the Quantum Systems Institute has demonstrated a significant breakthrough in quantum computing that experts say could accelerate the timeline for quantum computers capable of breaking widely used encryption systems. The development, published yesterday in the journal Science Quantum, has sent ripples through cybersecurity communities and prompted calls for faster implementation of quantum-resistant encryption methods.</p>
    
    <h2>The Technical Achievement</h2>
    <p>The research team, led by Dr. Liu Wei, achieved what quantum computing specialists call "error correction at scale" – the ability to maintain quantum coherence and correct errors across a substantially larger number of qubits than previously possible. This has been one of the critical barriers to building quantum computers powerful enough to tackle complex problems like breaking RSA encryption.</p>
    
    <figure>
      <img src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1200&h=800&auto=format&fit=crop" alt="Quantum computer" />
      <figcaption>The experimental quantum computing setup at the Quantum Systems Institute research facility.</figcaption>
    </figure>
    
    <p>"What makes this significant is not just the technical achievement, but the fact that we reached this milestone several years ahead of what most roadmaps predicted," explained Dr. Wei. "This doesn't mean quantum computers can break encryption tomorrow, but it does compress the timeline for when that might become possible."</p>
    
    <h2>Security Implications</h2>
    <p>The cybersecurity implications of this breakthrough are substantial. Many current encryption systems, particularly RSA and ECC (Elliptic Curve Cryptography) which secure everything from financial transactions to sensitive communications, are theoretically vulnerable to quantum computing attacks.</p>
    
    <p>While experts have long known this vulnerability exists, the general consensus has been that practically useful quantum computers were still at least a decade away, providing ample time for systems to transition to quantum-resistant algorithms. This new development suggests that timeline may need revision.</p>
    
    <p>"This is a wake-up call for organizations that have been slow to take quantum threats seriously," said Eliana Suarez, director of the International Cybersecurity Consortium. "We're not saying panic is warranted, but accelerated planning certainly is."</p>
    
    <h2>Industry Response</h2>
    <p>Major technology companies and financial institutions have responded quickly to the news. Several banks announced accelerated timelines for implementing post-quantum cryptography, while technology providers issued statements reassuring customers about their quantum security roadmaps.</p>
    
    <p>Government agencies are also responding. The National Institute of Standards and Technology (NIST), which has been working on standardizing quantum-resistant cryptographic algorithms, indicated it may expedite its final recommendations.</p>
    
    <p>For ordinary internet users, experts emphasize that immediate changes aren't necessary, but awareness is important. "This is a reminder that cryptography is not set-and-forget," noted cybersecurity researcher Marcus Thompson. "The security landscape evolves, and our systems need to evolve with it."</p>`,
    trending: true,
  },
  {
    id: '5',
    title: 'Revolutionary Cancer Treatment Shows Promise in Clinical Trials',
    slug: 'cancer-treatment-clinical-trials',
    category: 'health',
    image: 'https://images.unsplash.com/photo-1631563019676-dada0c0d30bf?q=80&w=1200&h=800&auto=format&fit=crop',
    author: {
      name: 'Patricia Nelson',
      avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    },
    date: '2023-11-24',
    readTime: 5,
    excerpt: 'A new immunotherapy approach has shown remarkable results in treating previously resistant forms of cancer, according to recently published trial data.',
    content: `<p>A groundbreaking immunotherapy approach developed by researchers at the Medical Innovation Center has shown remarkable results in treating previously resistant forms of cancer, according to data from Phase II clinical trials published this week in the New England Journal of Medicine. The treatment, which combines two novel biological compounds to enhance the body's immune response to cancer cells, achieved complete remission in 47% of patients with advanced-stage malignancies that had not responded to conventional treatments.</p>
    
    <h2>Beyond Current Immunotherapies</h2>
    <p>While immunotherapy has revolutionized cancer treatment over the past decade, many patients either don't respond to existing approaches or develop resistance over time. The new treatment, designated IMT-370, takes a fundamentally different approach.</p>
    
    <figure>
      <img src="https://images.unsplash.com/photo-1579154341098-e4e158cc7f55?q=80&w=1200&h=800&auto=format&fit=crop" alt="Medical research" />
      <figcaption>Researchers at the Medical Innovation Center analyzing treatment response data.</figcaption>
    </figure>
    
    <p>"Current immunotherapies typically focus on removing the 'brakes' cancer puts on immune cells," explained Dr. Rebecca Tanaka, who led the research team. "IMT-370 does this too, but simultaneously addresses the 'invisibility cloak' that makes cancer cells hard for the immune system to identify. This dual approach appears to be a game-changer for patients who've exhausted other options."</p>
    
    <h2>Patient Outcomes</h2>
    <p>The trial involved 128 patients with various forms of cancer that had progressed despite multiple lines of treatment. Particularly notable were the results in triple-negative breast cancer and advanced colorectal cancer, two forms that have historically been difficult to treat with immunotherapy.</p>
    
    <p>Among the patients who achieved complete remission, 80% have remained cancer-free for more than 18 months of follow-up. Side effects were described as manageable, primarily consisting of inflammatory responses that could be addressed with supportive care.</p>
    
    <p>One participant in the trial, 57-year-old Carlos Mendez, had exhausted all standard treatments for metastatic melanoma before enrolling. "After my second round of treatment, scans showed significant reduction in my tumors. By the sixth round, they couldn't detect any cancer at all. It's been 20 months now with no recurrence."</p>
    
    <h2>Next Steps</h2>
    <p>Based on these results, the research team has received approval to begin a larger Phase III trial, which will enroll approximately 500 patients across 38 medical centers globally. They're also exploring the potential of combining IMT-370 with other existing treatments to enhance effectiveness further.</p>
    
    <p>The pharmaceutical company partnering on the development, BioVenture Therapeutics, has indicated that they're preparing for the possibility of seeking accelerated approval if the Phase III results confirm the treatment's efficacy.</p>
    
    <p>"We're cautiously optimistic," said Dr. Tanaka. "While these results are extraordinarily promising, we're scientifically bound to validate them in a larger population before drawing definitive conclusions. That said, for patients who've run out of options, this approach offers genuine hope where little existed before."</p>`,
  },
  {
    id: '6',
    title: 'Renaissance Art Exhibition Draws Record Crowds',
    slug: 'renaissance-art-exhibition',
    category: 'arts',
    image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=1200&h=800&auto=format&fit=crop',
    author: {
      name: 'Thomas Wright',
      avatar: 'https://randomuser.me/api/portraits/men/85.jpg',
    },
    date: '2023-11-23',
    readTime: 4,
    excerpt: 'A landmark exhibition featuring previously unseen Renaissance masterpieces has become the most visited art event of the decade.',
    content: `<p>The Metropolitan Art Museum's landmark exhibition "Renaissance Rediscovered" has become the most visited art event of the decade, drawing over 500,000 visitors in its first month. The exhibition, which brings together previously unseen masterpieces from private collections around the world, has captivated audiences with its unprecedented assembly of Renaissance treasures and innovative presentation techniques.</p>
    
    <h2>A Once-in-a-Lifetime Collection</h2>
    <p>Five years in the making, the exhibition features 87 works from more than 30 private collections, many of which have never before been displayed publicly. The centerpiece is a recently authenticated Botticelli that had been hanging in an Italian villa for centuries, misattributed to a lesser-known artist until recent technical analysis confirmed its true creator.</p>
    
    <figure>
      <img src="https://images.unsplash.com/photo-1569350080887-dd38c27caad4?q=80&w=1200&h=800&auto=format&fit=crop" alt="Art exhibition" />
      <figcaption>Visitors examining the newly authenticated Botticelli work at the Metropolitan Art Museum.</figcaption>
    </figure>
    
    <p>"Assembling these works was a diplomatic and logistical miracle," said exhibition curator Dr. Isabella Moretti. "Many of these pieces are considered family treasures, passed down through generations. Convincing the owners to lend them required building relationships over years, not months."</p>
    
    <h2>Technology Meets Tradition</h2>
    <p>While the masterpieces themselves are the obvious draw, the exhibition has garnered particular praise for its innovative use of technology to enhance visitors' understanding and experience of the works.</p>
    
    <p>Each painting is accompanied by a digital display that allows visitors to explore the work in unprecedented detail, revealing underpainting, changes made during creation, and details invisible to the naked eye. A specially developed augmented reality experience places selected works in their original contexts, showing how they would have appeared in Renaissance churches, palaces, or private homes.</p>
    
    <p>"We wanted to balance reverence for these masterpieces with tools that make them more accessible and meaningful to contemporary audiences," explained Dr. Moretti. "The technology isn't there to distract from the art, but to deepen the connection between viewer and creation."</p>
    
    <h2>Cultural Impact</h2>
    <p>The exhibition's popularity has extended far beyond traditional art enthusiasts. Social media has played a significant role in attracting younger audiences, with certain rooms designed to be "Instagram-friendly" while still maintaining the integrity of the presentation.</p>
    
    <p>Local businesses report significant upticks in traffic, as restaurants, hotels, and shops benefit from the influx of cultural tourists. The museum has extended its hours to accommodate demand, now remaining open until 11 pm on weekends.</p>
    
    <p>"What's particularly gratifying is seeing people who wouldn't typically visit an art museum becoming completely absorbed in these works," said museum director Richard Townsend. "We're witnessing people having profound aesthetic experiences—moments of real connection across centuries. That's ultimately what these Renaissance masters were aiming for: to create work that speaks to our shared humanity, transcending time and place."</p>`,
  },
  {
    id: '7',
    title: 'Deep Sea Exploration Reveals New Marine Species',
    slug: 'deep-sea-exploration-marine-species',
    category: 'science',
    image: 'https://images.unsplash.com/photo-1551244072-5d12893278ab?q=80&w=1200&h=800&auto=format&fit=crop',
    author: {
      name: 'James Wilson',
      avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
    },
    date: '2023-11-22',
    readTime: 6,
    excerpt: 'An international research expedition to previously unexplored ocean depths has discovered dozens of new marine species, providing new insights into deep-sea ecosystems.',
    content: `<p>An international research expedition to previously unexplored ocean depths has discovered dozens of previously unknown marine species, providing new insights into deep-sea ecosystems and their evolutionary adaptations. The three-month mission, which explored regions of the western Pacific at depths exceeding 6,000 meters, has been described by participating scientists as one of the most productive deep-sea research expeditions in recent history.</p>
    
    <h2>Evolutionary Marvels</h2>
    <p>Among the most significant discoveries were several species that challenge existing understandings of how organisms adapt to extreme environments. Of particular interest is a new species of snailfish found thriving at depths of over 8,000 meters, where crushing pressure and near-freezing temperatures would be lethal to most vertebrates.</p>
    
    <figure>
      <img src="https://images.unsplash.com/photo-1520366498724-709889c0c685?q=80&w=1200&h=800&auto=format&fit=crop" alt="Marine research" />
      <figcaption>A newly discovered deep-sea creature being examined aboard the research vessel.</figcaption>
    </figure>
    
    <p>"This snailfish has cellular adaptations we've never seen before," explained marine biologist Dr. Sophia Nakamura. "Its cells contain high concentrations of a previously unknown protein that appears to stabilize vital structures under extreme pressure. This could have implications not just for marine biology, but potentially for medical applications and materials science."</p>
    
    <h2>Ecosystem Insights</h2>
    <p>Beyond individual species, the expedition has yielded valuable data about deep-sea ecosystems as interconnected wholes. Using advanced submersibles and remote sampling technologies, researchers were able to document complex relationships between various organisms and their environments.</p>
    
    <p>One surprising finding was the discovery of thriving communities near deep-sea thermal vents that utilize chemosynthesis rather than photosynthesis as their energy foundation. While such communities have been observed before, the diversity and complexity of these particular ecosystems exceeded expectations.</p>
    
    <p>"What we're seeing is essentially an alternative evolutionary path," said expedition leader Dr. Marcus Velazquez. "These communities have developed entirely different solutions to the challenges of survival than those in sunlit regions. It's a powerful reminder of life's remarkable adaptability."</p>
    
    <h2>Conservation Implications</h2>
    <p>The discoveries come at a time of increasing interest in deep-sea mining, raising questions about potential threats to these little-understood ecosystems. Several of the newly discovered species were found in areas that contain valuable mineral deposits eyed by mining companies.</p>
    
    <p>The research team emphasized the importance of establishing marine protected areas and developing strict environmental protocols before any industrial activities proceed in deep ocean regions.</p>
    
    <p>"What we've documented is almost certainly just a fraction of what exists in these depths," noted Dr. Nakamura. "We're still at the very beginning of understanding these ecosystems. The risk of causing irreversible damage before we've even cataloged what's there is very real."</p>
    
    <p>The expedition's findings will be published in a series of papers over the coming months, with genetic material and specimens preserved for further study at participating research institutions around the world.</p>`,
    trending: true,
  },
  {
    id: '8',
    title: 'Urban Architecture Trends Prioritize Sustainability and Community',
    slug: 'urban-architecture-sustainability-community',
    category: 'arts',
    image: 'https://images.unsplash.com/photo-1485628390555-1a7bd503f9fe?q=80&w=1200&h=800&auto=format&fit=crop',
    author: {
      name: 'Olivia Martinez',
      avatar: 'https://randomuser.me/api/portraits/women/12.jpg',
    },
    date: '2023-11-21',
    readTime: 5,
    excerpt: 'Contemporary urban architecture is increasingly focusing on sustainability features and community-oriented designs that promote social interaction and well-being.',
    content: `<p>Contemporary urban architecture is increasingly focusing on sustainability features and community-oriented designs that promote social interaction and well-being, according to industry experts at this year's International Urban Design Forum. This shift represents a significant departure from the glass-and-steel monumentalism that dominated urban skylines for decades, with architects now prioritizing human-scale developments that integrate with their surroundings and serve diverse social needs.</p>
    
    <h2>Beyond Green Facades</h2>
    <p>While sustainable features like solar panels and green roofs have become standard in new developments, leading architectural firms are pushing the boundaries further. Projects showcased at the forum demonstrated innovative approaches that go beyond aesthetic "greenwashing" to create genuinely regenerative buildings.</p>
    
    <figure>
      <img src="https://images.unsplash.com/photo-1578308396566-c1075f0dc292?q=80&w=1200&h=800&auto=format&fit=crop" alt="Sustainable architecture" />
      <figcaption>The award-winning Harmony Tower incorporates vertical gardens that filter air and reduce urban heat island effects.</figcaption>
    </figure>
    
    <p>"We're seeing a move from building sustainability as an add-on feature to having it deeply embedded in the fundamental design approach," explained Priya Sharma, principal at Global Architecture Collaborative. "The most exciting projects now are those where you can't separate the sustainability elements from the building itself—they're one and the same."</p>
    
    <h2>Community-Centered Design</h2>
    <p>Equally significant is the renewed emphasis on how architecture shapes social interactions and community dynamics. Mixed-use developments that combine residential, commercial, cultural, and recreational spaces are increasingly common, designed to create vibrant micro-communities within urban settings.</p>
    
    <p>Architects like Carlos Mendoza, whose firm received multiple awards at the forum, are incorporating features specifically designed to encourage spontaneous encounters between residents and visitors. "We're designing what we call 'collision spaces'—areas where people naturally cross paths and pause, creating opportunities for interaction that wouldn't happen in more traditionally designed buildings."</p>
    
    <p>These approaches include configurations such as central courtyards accessible from multiple entry points, rooftop gardens with community farming plots, and ground floors that blur the boundaries between public and private space.</p>
    
    <h2>Adaptive Reuse Leading Innovation</h2>
    <p>Some of the most acclaimed projects featured at the forum weren't new constructions at all, but creative adaptations of existing structures. This approach—known as adaptive reuse—preserves embodied carbon and cultural heritage while reimagining spaces for contemporary needs.</p>
    
    <p>The Gold Medal winner, a former industrial warehouse transformed into a community hub with affordable housing, art studios, and public gathering spaces, exemplifies this trend. By preserving the original brick facade and industrial character while updating the interior for energy efficiency and accessibility, the project connects the neighborhood's past with its future.</p>
    
    <p>"There's a growing recognition that the most sustainable building is often one that already exists," noted preservation architect Hiroshi Tanaka. "The challenge is updating these structures to meet contemporary standards while honoring their history and character. When done well, these buildings can become the most beloved and distinctive elements of a cityscape."</p>`,
  },
];

export const getArticleBySlug = (slug: string): Article | undefined => {
  return articles.find(article => article.slug === slug);
};

export const getArticlesByCategory = (category: string): Article[] => {
  return articles.filter(article => article.category === category);
};

export const getFeaturedArticles = (): Article[] => {
  return articles.filter(article => article.featured);
};

export const getTrendingArticles = (): Article[] => {
  return articles.filter(article => article.trending);
};

export const getLatestArticles = (): Article[] => {
  return [...articles].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

export const getCategoryBySlug = (slug: string): Category | undefined => {
  return categories.find(category => category.slug === slug);
};
