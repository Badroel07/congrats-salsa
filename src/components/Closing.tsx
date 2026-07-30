import { useState } from 'react';
import { motion } from 'framer-motion';
import { siteConfig } from '../content/site.config';
import { scaleIn } from '../animations/variants';
import { shareViaWhatsApp, copyLink } from '../utils/share';
import { WhatsappLogo, Copy } from '@phosphor-icons/react';

export default function Closing() {
  const { sender, closing } = siteConfig;
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    shareViaWhatsApp(siteConfig.share.whatsappMessage);
  };

  const handleCopyLink = async () => {
    const success = await copyLink();
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  return (
    <div className="w-full h-full flex items-center justify-center p-2 md:p-4 select-none max-w-2xl mx-auto max-h-[85vh]">
      <motion.div
        variants={scaleIn}
        initial="hidden"
        animate="visible"
        className="card-romantic p-6 md:p-10 relative z-10 w-full max-h-[80vh] overflow-y-auto pr-1 scrollbar-thin flex flex-col justify-center items-center"
      >
        <h2 className="text-2xl md:text-3xl font-elegant text-romantic-text mb-3">
          {closing.title}
        </h2>
        <p className="text-xs md:text-sm text-romantic-text/80 leading-relaxed mb-6 max-w-md mx-auto">
          {closing.message}
        </p>

        {/* Signature */}
        <div className="mb-6">
          <p className="text-[11px] font-sans tracking-wide text-romantic-text/60 italic mb-1">
            {sender.signatureMessage}
          </p>
          <p className="font-signature text-4xl md:text-5xl text-romantic-primary drop-shadow-sm select-none">
            {sender.name}
          </p>
        </div>

        {/* Buttons / Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center w-full sm:w-auto">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleShare}
            className="flex items-center gap-2 bg-gradient-to-r from-romantic-primary to-romantic-secondary text-white font-semibold px-5 py-2.5 rounded-full shadow-romantic hover:brightness-105 transition-all text-xs w-full sm:w-auto justify-center"
            style={{ minHeight: '44px' }}
          >
            <WhatsappLogo size={18} weight="bold" />
            {closing.shareButton}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleCopyLink}
            className="flex items-center gap-2 bg-white/70 hover:bg-white border border-romantic-primary/30 text-romantic-primary font-semibold px-5 py-2.5 rounded-full shadow-sm transition-all text-xs w-full sm:w-auto justify-center"
            style={{ minHeight: '44px' }}
          >
            <Copy size={18} weight="bold" />
            {copied ? closing.copiedText : closing.copyButton}
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
