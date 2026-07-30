export interface SiteConfig {
  siteTitle: string;
  siteSubtitle: string;
  launchDate: string;

  recipient: {
    name: string;
    nickname: string;
  };

  sender: {
    name: string;
    signatureMessage: string;
  };

  jobInfo: {
    companyName: string;
    positionTitle: string;
    acceptedDate: string;
    achievementSummary: string;
  };

  envelope: {
    hintText: string;
    toLabel: string;
    fromLabel: string;
    previewText: string;
    ctaText: string;
    openingText: string;
  };

  hero: {
    titleFormat: string;
    scrollDown: string;
  };

  openingMessages: string[];

  sectionTitles: {
    proudReasons: string;
    timeline: string;
    gallery: string;
    gallerySubtitle: string;
  };

  loveLetterParagraphs: Array<{
    text: string;
    animation: 'fade' | 'slide' | 'typewriter';
  }>;

  proudReasons: Array<{
    icon: 'heart' | 'star' | 'sparkle';
    text: string;
  }>;

  timelineMemories: Array<{
    date: string;
    title: string;
    description: string;
    photoUrl?: string;
  }>;

  galleryPhotos: Array<{
    url: string;
    alt: string;
    aspectRatio: 'portrait' | 'landscape' | 'square';
  }>;

  music: {
    trackUrl: string;
    trackTitle: string;
    artistName: string;
    volume: number;
    autoplayAttempt: boolean;
  };

  ambientParticles: {
    heartsDensity: 'low' | 'medium' | 'high';
    sparklesEnabled: boolean;
    colorPalette: string[];
  };

  closing: {
    title: string;
    message: string;
    shareButton: string;
    copyButton: string;
    copiedText: string;
  };

  labels: {
    musicPlay: string;
    musicStop: string;
  };

  share: {
    whatsappMessage: string;
    instagramCaption: string;
  };
}

export const siteConfig: SiteConfig = {
  siteTitle: 'Untuk Kamu, Sayang 💕',
  siteSubtitle: 'Selamat atas pencapaian luar biasamu!',
  launchDate: '2026-07-30',

  recipient: {
    name: 'Salsa',
    nickname: 'Sayang',
  },

  sender: {
    name: 'Chikal',
    signatureMessage: 'Nailongnya kamu',
  },

  jobInfo: {
    companyName: 'Perusahaan Impian',
    positionTitle: 'Posisi Impian',
    acceptedDate: '2026-07-28',
    achievementSummary:
      'Diterima kerja di perusahaan impian: sebuah langkah besar yang membuktikan semua kerja keras, air mata, dan doa yang nggak pernah berhenti.',
  },

  envelope: {
    hintText: 'Ada surat untukmu... 💕',
    toLabel: 'To: {name} 💕',
    fromLabel: 'From: {name}',
    previewText: 'Ada sesuatu yang spesial buat kamu...',
    ctaText: 'Tap Hati untuk Membuka Surat',
    openingText: 'Membuka Surat Cinta...',
  },

  hero: {
    titleFormat: 'Selamat {name}, Kamu Hebat',
    scrollDown: 'Scroll Down',
  },

  openingMessages: [
    'Pertama-tama, aku ucapkan selamat yaa sayanggg 😘',
    'pasti capee yaa? akuu ngertii kok, makanya aku bikin ini buat kamuu biar capenya ilanggg',
    'jadi pelan-pelan aja yaa bacanya... ada beberapa hal yang mau aku bilang ke kamu 💌',
  ],

  sectionTitles: {
    proudReasons: 'Kenapa Aku Bangga Banget Sama Kamu',
    timeline: 'Perjalanan Kita & Perjuanganmu',
    gallery: 'Galeri Kebersamaan Kita',
    gallerySubtitle:
      'Momen-momen manis yang terekam sepanjang perjalanan kita, saksi bisu betapa bahagianya aku di sampingmu.',
  },

  loveLetterParagraphs: [
    {
      text: 'halooo sayanggkuu cintakuuu my calcaa💕',
      animation: 'typewriter',
    },
    {
      text: 'senenggg gaaa dikasihh yang kayakk ginii?? harus senengg dongg masa enggakk rawerrr :P',
      animation: 'fade',
    },
    {
      text: 'selamatt yaaa sekarangg sudah jadi mba mba indomarett. ikutt bahagiaa sihh aku soalnya biar kamu ga tidur muluu ahh, wkwkwkw. tapi sisi lainn yaa aku agak kesepiann (dikit) 😇',
      animation: 'slide',
    },
    {
      text: 'maaf yaa hadiah selamattnyaa alakadarnyaa. aku cuma bisa ngasih kamuu bungaa ituu. aku diem diem belii dan cari toko buket bunga terdekat dari rumah kamuu. ga seberapa sihh hehe tapii semoga ini bikin kamu senengg :D',
      animation: 'fade',
    },
    {
      text: 'maaf jugaa selama kamuu training akuu suka ovt mikirr yangg enggaaa-enggaa, maaf yakk bukan berarti aku ribet atau apaa tapi yaa kepikiran aja sihh.',
      animation: 'slide',
    },
    {
      text: 'maaf jugaa aku cuma bisa kasih kamu dukungan hanya dalam bentuk teks pesan, bukan dukungann dalam bentuk nyataa, maaff bangett 😢',
      animation: 'slide',
    },
    {
      text: 'kok jadi banyak maaf yaaa wkwkwkw. udahh sih ituu ajaaa',
      animation: 'slide',
    },
    {
      text: 'intinyaa aku ikut senanggg kamu keterima kerjaaa, semogaa betah yaa kerjanya (jgn kayak temen kamu yg dikit-dikit resign wkwk).',
      animation: 'slide',
    },
    {
      text: 'Terimaa kasihh udah baca pesan akuu sayanggg. Gajago bikin kata kata aku jir belepotan gini',
      animation: 'typewriter',
    },
  ],

  proudReasons: [
    { icon: 'star', text: 'Kamu nggak pernah menyerah, bahkan saat semuanya terasa mustahil' },
    { icon: 'heart', text: 'Kamu selalu memberikan yang terbaik di setiap kesempatan' },
    { icon: 'sparkle', text: 'Kamu berani bermimpi besar dan mewujudkannya' },
    { icon: 'heart', text: 'Cara kamu menghadapi kegagalan itu inspiratif banget' },
    { icon: 'star', text: 'Kamu tetap rendah hati meski udah sehebat ini' },
    { icon: 'sparkle', text: 'Kamu selalu peduli sama orang lain, bahkan saat sibuk' },
    { icon: 'heart', text: 'Kamu bertumbuh setiap hari dan itu buat aku makin sayang' },
  ],

  timelineMemories: [
    {
      date: '2024-01',
      title: 'Pertama Kali Bertemu',
      description: 'Awal dari segalanya. Pertemuan yang nggak pernah aku sangka akan membawa kita sejauh ini.',
    },
    {
      date: '2024-06',
      title: 'Liburan Pertama',
      description: 'Liburan pertama kita bareng-bareng. Banyak cerita lucu dan momen yang bikin kita makin dekat.',
    },
    {
      date: '2024-12',
      title: 'Ujian Terberat',
      description: 'Masa-masa sulit yang kita lewati bersama. Bukti kalau kita bisa melewati apa pun selama kita bersatu.',
    },
    {
      date: '2025-03',
      title: 'Mulai Interview',
      description: 'Awal dari perjalanan kariermu. Aku lihat semangat dan tekad yang nggak pernah padam.',
    },
    {
      date: '2025-06',
      title: 'Proses Panjang',
      description: 'Bulan-bulan penuh proses, reject, dan bangkit lagi. Kamu nggak pernah berhenti percaya.',
    },
    {
      date: '2026-07',
      title: 'DITERIMA! 🎉',
      description: 'Puncak dari segalanya. Kamu berhasil, Sayang! Ini baru permulaan.',
    },
  ],

  galleryPhotos: [
    {
      url: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=600&h=600&fit=crop',
      alt: 'Momen romantis bersama',
      aspectRatio: 'square',
    },
    {
      url: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=600&h=800&fit=crop',
      alt: 'Kebersamaan yang indah',
      aspectRatio: 'portrait',
    },
    {
      url: 'https://images.unsplash.com/photo-1474552226712-ac0f0961a954?w=800&h=600&fit=crop',
      alt: 'Petualangan kita',
      aspectRatio: 'landscape',
    },
    {
      url: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=600&h=600&fit=crop',
      alt: 'Senyum yang selalu kusuka',
      aspectRatio: 'square',
    },
    {
      url: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=600&h=800&fit=crop',
      alt: 'Hari yang spesial',
      aspectRatio: 'portrait',
    },
    {
      url: 'https://images.unsplash.com/photo-1474552226712-ac0f0961a954?w=800&h=600&fit=crop',
      alt: 'Bersama selamanya',
      aspectRatio: 'landscape',
    },
  ],

  music: {
    trackUrl: '/audio/bgm.mp3',
    trackTitle: 'Perfect - Ed Sheeran',
    artistName: 'Ed Sheeran',
    volume: 0.5,
    autoplayAttempt: true,
  },

  ambientParticles: {
    heartsDensity: 'high',
    sparklesEnabled: true,
    colorPalette: ['#FDB813', '#FF8CA3', '#FFE59E', '#FFFDF9', '#FFCCD5'],
  },

  closing: {
    title: 'Selamat Berjuang di Langkah Barumu!',
    message:
      'Aku yakin kamu bakal bersinar di sana. Selalu jaga kesehatan, tetap jadi diri sendiri yang ceria dan penuh semangat ya Sayang. Aku selalu ada di sini mendukungmu!',
    shareButton: 'Bagikan ke WhatsApp',
    copyButton: 'Salin Link',
    copiedText: 'Link Tersalin! 💕',
  },

  labels: {
    musicPlay: 'Putar musik latar belakang',
    musicStop: 'Matikan musik latar belakang',
  },

  share: {
    whatsappMessage:
      '💕 Ada pesan spesial buat aku! Lihat yuk: [URL]',
    instagramCaption:
      'Makasih sayang udah bikin website ini 🥺💕',
  },
};
