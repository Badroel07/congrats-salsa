import { siteConfig } from '../content/site.config';

export default function TimelineSection() {
  const { timelineMemories, sectionTitles } = siteConfig;

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-2 md:p-4 select-none max-w-3xl mx-auto max-h-[85vh]">
      <div className="text-center mb-6 shrink-0">
        <h2 className="text-2xl md:text-3xl font-elegant text-romantic-text mb-2">
          {sectionTitles.timeline}
        </h2>
        <div className="w-16 h-[2px] bg-romantic-primary/30 mx-auto rounded-full" />
      </div>

      <div className="relative pl-8 md:pl-10 w-full overflow-y-auto pr-1 scrollbar-thin max-h-[60vh] py-1 text-left">
        {/* Core Vertical Timeline Line */}
        <div className="absolute left-[15px] md:left-[19px] top-2 bottom-2 w-[2px] bg-[#FFE59E] rounded-full" />
        
        {/* Progressive Filled Line - Static representation in slideshow */}
        <div
          className="absolute left-[15px] md:left-[19px] top-2 bottom-2 w-[2px] bg-gradient-to-b from-[#FDB813] via-[#FF8CA3] to-[#90B77D] rounded-full"
        />

        <div className="space-y-4">
          {timelineMemories.map((milestone, index) => (
            <div key={index} className="timeline-item relative">
              {/* Timeline Dot Indicator */}
              <div className="timeline-dot absolute -left-[23px] md:-left-[27px] top-2.5 w-4 h-4 rounded-full bg-white border-2 border-[#FDB813] flex items-center justify-center shadow-md z-10">
                <div className="w-1.5 h-1.5 rounded-full bg-[#FF8CA3]" />
              </div>

              {/* Memory Card Content */}
              <div className="timeline-content card-romantic p-4 hover:bg-white/80 transition-all flex flex-col md:flex-row gap-4 items-start md:items-center">
                
                {milestone.photoUrl && (
                  <div className="overflow-hidden rounded-lg border border-white/50 shadow-sm w-20 h-20 shrink-0 md:order-last">
                    <img
                      src={milestone.photoUrl}
                      alt={milestone.title}
                      loading="lazy"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}

                <div className="flex-grow">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="inline-block px-2.5 py-0.5 text-[10px] font-semibold bg-[#FFE59E] border border-[#FDB813]/30 text-[#3E2723] rounded-full">
                      {milestone.date}
                    </span>
                    <h3 className="text-sm md:text-base font-bold text-romantic-text">
                      {milestone.title}
                    </h3>
                  </div>
                  <p className="text-romantic-text/85 text-xs md:text-sm leading-relaxed">
                    {milestone.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
