import React, { useState, useRef, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Play, Pause, Music, ChevronRight, BookOpen, Users, Leaf, ArrowUpCircle } from 'lucide-react';

const evaluationData = [
  { name: 'Nhận thức giá trị', score: 4.0, group: 'P1' },
  { name: 'Kỳ vọng lợi ích', score: 3.7, group: 'P1' },
  { name: 'Minh bạch thông tin', score: 2.8, group: 'P1' },
  { name: 'Cơ hội & Vốn', score: 2.7, group: 'P1' },
  { name: 'Tham gia thực hành*', score: 3.1, group: 'P2' },
  { name: 'Đề xuất sáng kiến*', score: 2.5, group: 'P2' },
  { name: 'Phối hợp & Niềm tin*', score: 3.3, group: 'P3' },
  { name: 'Ảnh hưởng quyết định', score: 2.4, group: 'P3' },
  { name: 'Tác động tổng hợp*', score: 3.2, group: 'P4' },
  { name: 'Mức độ hài lòng*', score: 3.4, group: 'P4' },
];

const references = [
  {
    id: '01',
    authors: 'Arnstein, S. R.',
    year: '1969',
    title: 'A ladder of citizen participation',
    source: 'Journal of the American Institute of Planners, 35(4), 216–224.',
    link: 'https://doi.org/10.1080/01944366908977225',
    group: 'Nhóm 1. Khung lý thuyết và đánh giá sự tham gia'
  },
  {
    id: '02',
    authors: 'Benedjma, I., & Mahimoud, A.',
    year: '2021',
    title: 'Applying the MOA (motivation-opportunity-ability) model for the evaluation of residents’ participation in built heritage rehabilitation: The case of Constantine',
    source: 'Journal of Cultural Heritage Management and Sustainable Development, 11(1), 18–38.',
    link: 'https://doi.org/10.1108/JCHMSD-08-2018-0055',
    group: 'Nhóm 1. Khung lý thuyết và đánh giá sự tham gia'
  },
  {
    id: '03',
    authors: 'Bộ Văn hóa, Thể thao và Du lịch.',
    year: '2024, 20 tháng 11',
    title: 'Thái Bình khai thác kho tàng di sản văn hóa gắn với phát triển du lịch',
    source: 'Cổng thông tin điện tử Bộ VHTTDL',
    link: 'https://bvhttdl.gov.vn/Pages/chi-tiet.aspx?url=%2Fthai-binh-khai-thac-kho-tang-di-san-van-hoa-gan-voi-phat-trien-du-lich-20241120082903608.htm',
    group: 'Nhóm 3. Bối cảnh di sản và phát triển du lịch tại Việt Nam'
  },
  {
    id: '04',
    authors: 'ICOMOS.',
    year: '2024; cập nhật 2025',
    title: 'International Conference on Participatory Approaches to World Heritage 2024',
    source: 'ICOMOS News',
    link: 'https://www.icomos.org/news/international-conference-on-participatory-approaches-to-world-heritage-2024/',
    group: 'Nhóm 2. Bảo tồn di sản và nguyên tắc tham gia của cộng đồng'
  },
  {
    id: '05',
    authors: 'Ngo, T. H., & Creutz, S.',
    year: '2022',
    title: 'Assessing the sustainability of community-based tourism: A case study in rural areas of Hoi An, Vietnam',
    source: 'Cogent Social Sciences, 8(1), 2116812.',
    link: 'https://doi.org/10.1080/23311886.2022.2116812',
    group: 'Nhóm 3. Bối cảnh di sản và phát triển du lịch tại Việt Nam'
  },
  {
    id: '06',
    authors: 'Pretty, J. N.',
    year: '1995',
    title: 'The many interpretations of participation',
    source: 'World Development, 23(8), 1251–1253.',
    link: null,
    group: 'Nhóm 1. Khung lý thuyết và đánh giá sự tham gia'
  },
  {
    id: '07',
    authors: 'Rasoolimanesh, S. M., Jaafar, M., Ahmad, A. G., & Barghi, R.',
    year: '2017',
    title: 'Community participation in World Heritage Site conservation and tourism development',
    source: 'Tourism Management, 58, 142–153.',
    link: 'https://doi.org/10.1016/j.tourman.2016.10.016',
    group: 'Nhóm 1. Khung lý thuyết và đánh giá sự tham gia'
  },
  {
    id: '08',
    authors: 'UNESCO.',
    year: '2003',
    title: 'Convention for the Safeguarding of the Intangible Cultural Heritage',
    source: 'UNESCO ICH',
    link: 'https://ich.unesco.org/en/convention',
    group: 'Nhóm 2. Bảo tồn di sản và nguyên tắc tham gia của cộng đồng'
  },
  {
    id: '09',
    authors: 'UNESCO.',
    year: 'n.d.',
    title: 'Ethical Principles for Safeguarding Intangible Cultural Heritage',
    source: 'UNESCO ICH',
    link: 'https://ich.unesco.org/en/ethics-and-ich-00866',
    group: 'Nhóm 2. Bảo tồn di sản và nguyên tắc tham gia của cộng đồng'
  },
  {
    id: '10',
    authors: 'Báo Nhân Dân.',
    year: '2024, 20 tháng 3',
    title: 'Nghề dệt đũi ở Nam Cao',
    source: 'Báo Nhân Dân Điện tử',
    link: 'https://nhandan.vn/nghe-det-dui-o-nam-cao-post800694.html',
    group: 'Nhóm 3. Bối cảnh di sản và phát triển du lịch tại Việt Nam'
  }
];

const LotusPattern = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-30 mx-auto mb-4">
    <path d="M12 22C12 22 19 18 19 12C19 6 12 2 12 2C12 2 5 6 5 12C5 18 12 22 12 22Z" stroke="#6B7B56" strokeWidth="1" />
    <path d="M12 22C12 22 15 17 15 12C15 7 12 2 12 2" stroke="#6B7B56" strokeWidth="1" />
    <path d="M12 22C12 22 9 17 9 12C9 7 12 2 12 2" stroke="#6B7B56" strokeWidth="1" />
  </svg>
);

const SilkRibbon = () => (
  <div className="absolute top-0 left-0 w-full overflow-hidden leading-none pointer-events-none opacity-30">
    <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[60px]">
      <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="#C4A47C"></path>
    </svg>
  </div>
);

export default function HeritageResearchSite() {
  const [activeTab, setActiveTab] = useState('home');
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const toggleAudio = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getGroupColor = (group) => {
    switch(group) {
      case 'P1': return '#C4A47C';
      case 'P2': return '#8B7355';
      case 'P3': return '#6B7B56';
      case 'P4': return '#A0522D';
      default: return '#4A3B32';
    }
  };

  const navItems = [
    { id: 'home', label: 'Trang chủ' },
    { id: 'framework', label: 'Khung đánh giá' },
    { id: 'results', label: 'Kết quả đánh giá' },
    { id: 'analysis', label: 'Phân tích & Phản biện' },
    { id: 'solutions', label: 'Giải pháp & Kết luận' }
  ];

  return (
    <div className="bg-[#FAF8F5] text-[#4A3B32] min-h-screen font-sans selection:bg-[#C4A47C] selection:text-white">
      {/* Audio Element (Dùng đường dẫn tương đối ./ để GitHub Pages nhận diện được) */}
      <audio ref={audioRef} loop src="./nhac-nen.mp4" />

      {/* Floating Music Button */}
      <button 
        onClick={toggleAudio}
        className="fixed bottom-6 right-6 z-50 bg-[#8B7355] text-white p-3 rounded-full shadow-lg hover:bg-[#6B7B56] transition-all flex items-center justify-center gap-2 group border border-white/20"
      >
        {isPlaying ? <Pause size={20} /> : <Play size={20} />}
        <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 ease-in-out font-medium text-sm">
          {isPlaying ? 'Tạm dừng nhạc' : 'Phát nhạc nền'}
        </span>
        <Music size={16} className={isPlaying ? "animate-pulse text-[#C4A47C]" : "text-white/70"} />
      </button>

      {/* Navigation */}
      <nav className="sticky top-0 z-40 bg-[#FAF8F5]/90 backdrop-blur-md border-b border-[#C4A47C]/30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0 flex items-center font-serif font-bold text-xl tracking-wider text-[#8B7355]">
              NAM CAO HERITAGE
            </div>
            <div className="hidden md:flex space-x-8">
              {navItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => { setActiveTab(item.id); scrollToTop(); }}
                  className={`${activeTab === item.id ? 'text-[#8B7355] border-b-2 border-[#8B7355]' : 'text-[#4A3B32]/70 hover:text-[#8B7355]'} px-3 py-2 text-sm font-medium transition-colors font-serif uppercase tracking-wide`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      <main className="relative min-h-[80vh]">
        {/* PHẦN 1: TRANG CHỦ */}
        {activeTab === 'home' && (
          <div className="animate-fade-in pb-20">
            <section className="relative w-full h-[85vh] flex items-center justify-center overflow-hidden">
              <img src="./tay ba lam.jpg" alt="Hoạt động cộng đồng làng đũi" className="absolute inset-0 w-full h-full object-cover opacity-35 mix-blend-multiply" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#FAF8F5] via-[#FAF8F5]/60 to-transparent"></div>
              
              <div className="relative z-10 text-center max-w-4xl px-4 mt-16">
                <LotusPattern />
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-[#4A3B32] mb-6 leading-tight drop-shadow-sm">
                  ĐÁNH GIÁ SỰ THAM GIA CỦA CỘNG ĐỒNG TRONG BẢO TỒN VÀ PHÁT TRIỂN <br/>
                  <span className="text-[#8B7355] italic">DI SẢN LÀNG LỤA ĐŨI NAM CAO</span>
                </h1>
                <p className="text-xl md:text-2xl font-serif text-[#6B7B56] mb-8 italic">
                  Lắng nghe cộng đồng – Gìn giữ nghề truyền thống – Hướng tới phát triển bền vững.
                </p>
                <div className="w-24 h-[1px] bg-[#C4A47C] mx-auto mb-8"></div>
                <p className="text-lg md:text-xl text-[#4A3B32]/90 leading-relaxed font-light px-4 md:px-12 mb-10 bg-white/40 p-4 rounded-sm backdrop-blur-sm border border-white/30 shadow-sm">
                  "Nghề dệt đũi Nam Cao không chỉ được gìn giữ bằng những kỹ thuật thủ công, mà còn gắn với tri thức nghề, sinh kế và sự tiếp nối giữa các thế hệ. Nghiên cứu đặt ra câu hỏi về vai trò của cộng đồng trong quá trình bảo tồn và phát triển di sản: người dân đang tham gia ở mức độ nào, và tiếng nói của họ có được xem xét trong những quyết định liên quan đến tương lai làng nghề hay không?"
                </p>
                <div className="flex justify-center gap-4 flex-wrap">
                  <button onClick={() => { setActiveTab('framework'); scrollToTop(); }} className="px-8 py-3 bg-[#8B7355] text-white rounded-sm hover:bg-[#4A3B32] transition-colors flex items-center gap-2 font-medium shadow-md">
                    Khám phá nghiên cứu <ChevronRight size={18} />
                  </button>
                  <button onClick={() => { setActiveTab('results'); scrollToTop(); }} className="px-8 py-3 border border-[#8B7355] text-[#8B7355] bg-white/50 backdrop-blur-sm rounded-sm hover:bg-[#8B7355]/10 transition-colors font-medium">
                    Xem kết quả đánh giá
                  </button>
                </div>
              </div>
            </section>

            <SilkRibbon />

            <section className="max-w-6xl mx-auto px-4 py-20 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                <div>
                  <h2 className="text-3xl font-serif font-bold mb-6 text-[#8B7355]">Di sản không chỉ nằm trong sản phẩm</h2>
                  <p className="text-lg leading-relaxed mb-6 font-light">
                    Nghề dệt lụa đũi Nam Cao gắn liền với tri thức, kỹ năng thủ công và đời sống của cộng đồng địa phương. Trong bối cảnh đương đại, bảo tồn nghề không chỉ là duy trì kỹ thuật sản xuất mà còn cần quan tâm đến sinh kế, hoạt động truyền nghề và vai trò của người dân trong quản lý, phát triển di sản.
                  </p>
                  <p className="text-lg leading-relaxed font-light">
                    Nghiên cứu tập trung đánh giá sự tham gia của cộng đồng thông qua bốn trụ cột, từ điều kiện tham gia đến mức độ chủ động, vai trò trong quản trị và tác động đối với tính bền vững của di sản.
                  </p>
                </div>
                <div className="relative">
                  <div className="absolute inset-0 bg-[#C4A47C] translate-x-4 translate-y-4 rounded-sm"></div>
                  <img src="./khung cui to.jpg" alt="Khung cửi tơ" className="relative z-10 w-full h-auto object-cover rounded-sm shadow-md" />
                </div>
              </div>
            </section>

            <section className="bg-[#EFEBE4] py-20 my-10 relative overflow-hidden">
              <div className="max-w-6xl mx-auto px-4 text-center relative z-10">
                <h2 className="text-2xl md:text-4xl font-serif font-bold text-[#8B7355] mb-12 max-w-3xl mx-auto leading-snug">
                  Sự tham gia của cộng đồng có thực sự chuyển hóa thành quyền ảnh hưởng đến tương lai di sản?
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                  <div className="hidden md:block absolute top-1/2 left-0 w-full h-[1px] bg-[#C4A47C] -translate-y-1/2 z-0"></div>
                  
                  <div className="bg-[#FAF8F5] p-8 rounded-sm shadow-sm relative z-10 border border-[#E0D8C8] hover:-translate-y-1 transition-transform">
                    <div className="w-12 h-12 rounded-full bg-[#C4A47C]/20 flex items-center justify-center mx-auto mb-4 text-[#8B7355]">
                      <Users size={24} />
                    </div>
                    <h3 className="font-serif font-bold text-xl mb-3 tracking-wide">HIỆN DIỆN</h3>
                    <p className="text-sm font-light">Cộng đồng có tham gia các hoạt động liên quan đến di sản?</p>
                  </div>
                  
                  <div className="bg-[#FAF8F5] p-8 rounded-sm shadow-sm relative z-10 border border-[#E0D8C8] hover:-translate-y-1 transition-transform">
                    <div className="w-12 h-12 rounded-full bg-[#8B7355]/20 flex items-center justify-center mx-auto mb-4 text-[#8B7355]">
                      <BookOpen size={24} />
                    </div>
                    <h3 className="font-serif font-bold text-xl mb-3 tracking-wide">ĐÓNG GÓP</h3>
                    <p className="text-sm font-light">Cộng đồng đóng góp công sức, kỹ năng và tri thức như thế nào?</p>
                  </div>
                  
                  <div className="bg-[#FAF8F5] p-8 rounded-sm shadow-sm relative z-10 border border-[#E0D8C8] hover:-translate-y-1 transition-transform">
                    <div className="w-12 h-12 rounded-full bg-[#6B7B56]/20 flex items-center justify-center mx-auto mb-4 text-[#6B7B56]">
                      <Leaf size={24} />
                    </div>
                    <h3 className="font-serif font-bold text-xl mb-3 tracking-wide">ẢNH HƯỞNG</h3>
                    <p className="text-sm font-light">Tiếng nói của cộng đồng có được xem xét trong quá trình ra quyết định?</p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* PHẦN 2: KHUNG ĐÁNH GIÁ */}
        {activeTab === 'framework' && (
          <div className="max-w-6xl mx-auto px-4 py-12 animate-fade-in">
            <div className="mb-12 border-b border-[#C4A47C]/30 pb-12 flex flex-col md:flex-row gap-10 items-center">
              <div className="flex-1">
                <LotusPattern />
                <h2 className="text-3xl font-serif font-bold mb-6 text-[#8B7355]">Đánh giá sự tham gia từ nhiều chiều cạnh</h2>
                <p className="text-lg font-light leading-relaxed mb-4">
                  Nghiên cứu xây dựng khung đánh giá gồm bốn trụ cột nhằm xem xét các điều kiện thúc đẩy hoặc cản trở sự tham gia, hình thức và mức độ chủ động của cộng đồng, vai trò của người dân trong quản trị và những tác động đối với tính bền vững của nghề dệt đũi.
                </p>
                <p className="text-lg font-light leading-relaxed mb-6">
                  Khung đánh giá không chỉ xem xét việc cộng đồng có tham gia hoạt động hay không, mà còn chú ý đến khả năng đóng góp, bày tỏ ý kiến và ảnh hưởng đến các quyết định liên quan đến di sản.
                </p>
              </div>
              <div className="flex-1">
                <img src="./hoa sen va lua.jpg" alt="Hoa sen và lụa đũi" className="w-full h-80 object-cover rounded-sm shadow-md" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              <div className="border-l-2 border-[#C4A47C] pl-6 py-2 bg-white/50 hover:bg-white transition-colors rounded-r-sm shadow-sm">
                <h3 className="text-xl font-serif font-bold text-[#C4A47C] mb-2">P1. Điều kiện tham gia (MOA)</h3>
                <p className="text-sm font-light mb-3 italic">Đánh giá động lực, cơ hội và năng lực có thể thúc đẩy hoặc cản trở người dân.</p>
                <ul className="text-sm mb-4 space-y-1 list-disc pl-4 text-[#4A3B32]/80">
                  <li><strong>Động lực:</strong> Nhận thức giá trị nghề, kỳ vọng lợi ích.</li>
                  <li><strong>Cơ hội:</strong> Khả năng tiếp cận thông tin, hoạt động, cuộc họp.</li>
                  <li><strong>Năng lực:</strong> Khả năng tiếp cận vốn, kỹ năng, thời gian.</li>
                </ul>
                <div className="bg-[#FAF8F5] p-3 text-sm italic border border-[#EFEBE4] rounded-sm">
                  “Người dân có đủ động lực, cơ hội và năng lực để tham gia thực chất vào quá trình bảo tồn và phát triển di sản hay không?”
                </div>
              </div>

              <div className="border-l-2 border-[#8B7355] pl-6 py-2 bg-white/50 hover:bg-white transition-colors rounded-r-sm shadow-sm">
                <h3 className="text-xl font-serif font-bold text-[#8B7355] mb-2">P2. Cấp độ tham gia (Pretty)</h3>
                <p className="text-sm font-light mb-3 italic">Xem xét hình thức và mức độ chủ động của cộng đồng.</p>
                <ul className="text-sm mb-4 space-y-1 list-disc pl-4 text-[#4A3B32]/80">
                  <li>Tiếp nhận thông tin & Tham gia thực hiện hoạt động.</li>
                  <li>Đóng góp ý kiến.</li>
                  <li>Tham gia xây dựng kế hoạch.</li>
                  <li>Chủ động đề xuất và khởi xướng sáng kiến.</li>
                </ul>
                <div className="bg-[#FAF8F5] p-3 text-sm italic border border-[#EFEBE4] rounded-sm">
                  “Người dân chủ yếu thực hiện hoạt động theo kế hoạch có sẵn, hay có thể tham gia xây dựng kế hoạch và đề xuất hướng phát triển?”
                </div>
              </div>

              <div className="border-l-2 border-[#6B7B56] pl-6 py-2 bg-white/50 hover:bg-white transition-colors rounded-r-sm shadow-sm">
                <h3 className="text-xl font-serif font-bold text-[#6B7B56] mb-2">P3. Quản trị và quyền lực</h3>
                <p className="text-sm font-light mb-3 italic">Đánh giá vai trò của cộng đồng trong quản trị di sản.</p>
                <ul className="text-sm mb-4 space-y-1 list-disc pl-4 text-[#4A3B32]/80">
                  <li>Minh bạch thông tin.</li>
                  <li>Cơ hội tham gia thảo luận.</li>
                  <li>Khả năng ảnh hưởng đến quyết định.</li>
                  <li>Sự phối hợp giữa nghệ nhân, người dân và doanh nghiệp.</li>
                </ul>
                <div className="bg-[#FAF8F5] p-3 text-sm italic border border-[#EFEBE4] rounded-sm">
                  “Ý kiến và nhu cầu của cộng đồng có được xem xét trong quá trình xây dựng và thực hiện các kế hoạch liên quan đến di sản hay không?”
                </div>
              </div>

              <div className="border-l-2 border-[#A0522D] pl-6 py-2 bg-white/50 hover:bg-white transition-colors rounded-r-sm shadow-sm">
                <h3 className="text-xl font-serif font-bold text-[#A0522D] mb-2">P4. Tác động và tính bền vững</h3>
                <p className="text-sm font-light mb-3 italic">Mối liên hệ giữa sự tham gia với sinh kế và khả năng bảo tồn dài hạn.</p>
                <ul className="text-sm mb-4 space-y-1 list-disc pl-4 text-[#4A3B32]/80">
                  <li>Sinh kế và điều kiện duy trì nghề.</li>
                  <li>Khả năng tiếp nối kỹ thuật thủ công.</li>
                  <li>Trao truyền tri thức giữa các thế hệ.</li>
                  <li>Gắn kết cộng đồng.</li>
                </ul>
                <div className="bg-[#FAF8F5] p-3 text-sm italic border border-[#EFEBE4] rounded-sm">
                  “Sự tham gia của cộng đồng góp phần duy trì nghề dệt đũi trong dài hạn như thế nào?”
                </div>
              </div>
            </div>

            <div className="bg-[#EFEBE4] p-8 rounded-sm text-center mb-12 shadow-inner border border-[#C4A47C]/20">
              <h3 className="text-xl font-serif font-bold mb-6">Mô hình đánh giá</h3>
              <div className="flex flex-col md:flex-row items-center justify-center gap-4 font-serif text-lg font-bold text-[#8B7355] mb-6">
                <span className="bg-white px-4 py-2 rounded-sm shadow-sm">HIỆN DIỆN</span>
                <span className="text-[#C4A47C]">→</span>
                <span className="bg-white px-4 py-2 rounded-sm shadow-sm">ĐÓNG GÓP</span>
                <span className="text-[#C4A47C]">→</span>
                <span className="bg-white px-4 py-2 rounded-sm shadow-sm">ẢNH HƯỞNG</span>
              </div>
              <p className="text-sm font-light max-w-2xl mx-auto leading-relaxed">
                - Hiện diện cho biết cộng đồng có mặt hoặc tham gia hoạt động.<br/>
                - Đóng góp cho biết cộng đồng cung cấp công sức, kỹ năng, tri thức hoặc nguồn lực.<br/>
                - Ảnh hưởng cho biết cộng đồng có khả năng tác động đến kế hoạch, quyết định và định hướng phát triển.
              </p>
              <div className="mt-6 inline-block bg-white px-6 py-3 border border-[#C4A47C] shadow-sm text-sm font-medium italic text-[#A0522D] rounded-sm">
                “Có mặt trong hoạt động không đồng nghĩa với việc có tiếng nói; đóng góp công sức hoặc tri thức cũng không tự động đồng nghĩa với quyền tham gia quyết định.”
              </div>
            </div>
            
            <div className="border-t border-[#C4A47C]/30 pt-10 mt-8 flex flex-col md:flex-row gap-8 items-center">
              <div className="md:w-2/3">
                <h4 className="font-serif font-bold text-[#4A3B32] mb-3 text-lg">Phương pháp nghiên cứu và giới hạn dữ liệu</h4>
                <p className="text-sm font-light leading-relaxed text-[#4A3B32]/80">
                  Nghiên cứu sử dụng cách tiếp cận hỗn hợp, kết hợp phỏng vấn nghệ nhân, lắng nghe chia sẻ của người làm nghề, thảo luận nhóm và xem xét tài liệu địa phương. Các kết quả định lượng được trình bày theo bộ chỉ báo và kết quả tự đánh giá của nhóm nghiên cứu. Các điểm số cần được đọc cùng chỉ báo và phương pháp chấm điểm tương ứng. Những chỉ báo chưa được xác nhận đầy đủ phải được đối chiếu với bảng chấm điểm gốc trước khi công bố. Không mặc nhiên xem kết quả tự đánh giá là đại diện cho toàn bộ cộng đồng.
                </p>
              </div>
              <div className="md:w-1/3">
                <img src="./tamnhu va ba.jpg" alt="Thảo luận nhóm tại cộng đồng" className="w-full h-auto rounded-sm shadow-sm" />
              </div>
            </div>
          </div>
        )}

        {/* PHẦN 3: KẾT QUẢ ĐÁNH GIÁ */}
        {activeTab === 'results' && (
          <div className="max-w-6xl mx-auto px-4 py-12 animate-fade-in">
            <div className="text-center mb-12">
              <LotusPattern />
              <h2 className="text-3xl font-serif font-bold mb-4 text-[#8B7355]">Kết quả tự đánh giá sau điền dã</h2>
              <p className="text-lg font-light leading-relaxed max-w-3xl mx-auto italic mb-4">
                “Các điểm số dưới đây phản ánh kết quả tự đánh giá của nhóm nghiên cứu theo thang điểm 5. Dữ liệu được sử dụng để nhận diện những chỉ báo nổi bật và những khía cạnh cần tiếp tục xem xét, không mặc nhiên đại diện cho toàn bộ cộng đồng Nam Cao.”
              </p>
              <span className="inline-block px-4 py-1 bg-[#EFEBE4] text-xs uppercase tracking-wider rounded-full border border-[#C4A47C]/40">
                Thang điểm: 0–5
              </span>
            </div>

            <div className="mb-12 h-[450px] w-full max-w-4xl mx-auto bg-white p-6 rounded-sm shadow-sm border border-[#EFEBE4]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  layout="vertical"
                  data={evaluationData}
                  margin={{ top: 20, right: 30, left: 100, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={true} stroke="#EFEBE4" />
                  <XAxis type="number" domain={[0, 5]} tickCount={6} stroke="#8B7355" />
                  <YAxis dataKey="name" type="category" width={140} tick={{fill: '#4A3B32', fontSize: 13, fontFamily: 'serif'}} stroke="#8B7355" />
                  <Tooltip 
                    cursor={{fill: '#FAF8F5'}}
                    contentStyle={{ backgroundColor: 'white', border: '1px solid #C4A47C', borderRadius: '4px', padding: '10px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}
                  />
                  <Bar dataKey="score" radius={[0, 4, 4, 0]} barSize={24}>
                    {evaluationData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={getGroupColor(entry.group)} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
              <div className="flex justify-center gap-6 mt-6 flex-wrap text-sm font-medium">
                <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-[#C4A47C]"></span> P1: Điều kiện</div>
                <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-[#8B7355]"></span> P2: Cấp độ</div>
                <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-[#6B7B56]"></span> P3: Quản trị</div>
                <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-[#A0522D]"></span> P4: Bền vững</div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="bg-white p-6 border-t-4 border-[#C4A47C] shadow-sm hover:shadow-md transition-shadow rounded-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-5"><LotusPattern /></div>
                <h3 className="font-serif font-bold text-lg mb-2 relative z-10">Nhận thức về giá trị nghề</h3>
                <div className="text-4xl font-serif text-[#C4A47C] mb-3 relative z-10">4,0<span className="text-lg text-[#4A3B32]/50">/5</span></div>
                <p className="text-sm font-light relative z-10">“Nhận thức về giá trị nghề là chỉ báo có điểm tự đánh giá cao nhất trong bảng dữ liệu được cung cấp. Đây là khía cạnh đáng chú ý khi xem xét động lực tham gia của cộng đồng.”</p>
              </div>
              <div className="bg-white p-6 border-t-4 border-[#8B7355] shadow-sm hover:shadow-md transition-shadow rounded-sm relative overflow-hidden">
                <h3 className="font-serif font-bold text-lg mb-2 relative z-10">Điều kiện tham gia</h3>
                <div className="mb-3 text-sm font-medium text-[#8B7355] relative z-10 bg-[#FAF8F5] p-2 rounded">Minh bạch: 2,8/5 | Cơ hội: 2,7/5</div>
                <p className="text-sm font-light relative z-10">“Các chỉ báo này có điểm thấp hơn chỉ báo về nhận thức giá trị nghề. Kết quả gợi mở việc cần xem xét kỹ hơn những điều kiện thực tế để người dân có thể tham gia vào hoạt động bảo tồn.”</p>
              </div>
              <div className="bg-white p-6 border-t-4 border-[#6B7B56] shadow-sm hover:shadow-md transition-shadow rounded-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-5"><LotusPattern /></div>
                <h3 className="font-serif font-bold text-lg mb-2 relative z-10">Tiếng nói trong quyết định</h3>
                <div className="text-4xl font-serif text-[#6B7B56] mb-3 relative z-10">2,4<span className="text-lg text-[#4A3B32]/50">/5</span></div>
                <p className="text-sm font-light relative z-10">“Chỉ báo ảnh hưởng đến quyết định có điểm tự đánh giá 2,4/5. Đây là cơ sở để đặt câu hỏi về cơ hội tham gia quản trị của cộng đồng, đồng thời cần đối chiếu với bằng chứng điền dã.”</p>
              </div>
            </div>

            <div className="mb-8 overflow-hidden rounded-sm shadow-md border border-white">
              <img src="./lua o nha co.jpg" alt="Lụa ở nhà cổ" className="w-full h-72 object-cover object-center" />
            </div>

            <div className="bg-[#EFEBE4]/70 border border-[#C4A47C]/40 p-5 rounded-sm text-sm text-[#4A3B32]/80 italic shadow-inner">
              <strong className="text-[#8B7355] not-italic mr-2">Lưu ý về dữ liệu:</strong> Các điểm số phản ánh kết quả tự đánh giá theo bộ chỉ báo của nhóm nghiên cứu. Những chỉ báo có dấu sao (*) cần được đối chiếu với bảng chấm điểm gốc. Không sử dụng các điểm số để khẳng định mức độ đại diện cho toàn bộ cộng đồng nếu chưa có thiết kế khảo sát phù hợp.
            </div>
          </div>
        )}

        {/* PHẦN 4: PHÂN TÍCH VÀ PHẢN BIỆN */}
        {activeTab === 'analysis' && (
          <div className="max-w-6xl mx-auto px-4 py-12 animate-fade-in">
            <div className="text-center mb-16">
              <LotusPattern />
              <h2 className="text-3xl font-serif font-bold mb-4 text-[#8B7355]">Từ tham gia đến ảnh hưởng</h2>
              <div className="w-16 h-[1px] bg-[#C4A47C] mx-auto"></div>
            </div>

            <div className="space-y-24">
              {/* P1 */}
              <div className="flex flex-col md:flex-row gap-12 items-start">
                <div className="md:w-1/3">
                  <div className="sticky top-24">
                    <h3 className="text-2xl font-serif font-bold text-[#C4A47C] mb-4">P1. Điều kiện tham gia</h3>
                    <div className="text-lg italic mb-6 font-serif border-l-2 border-[#C4A47C] pl-4 bg-white/50 py-1">Từ động lực đến cơ hội</div>
                    <img src="./toancanh lua o nha co.jpg" alt="Toàn cảnh lụa ở nhà cổ" className="w-full h-auto rounded-sm shadow-md" />
                  </div>
                </div>
                <div className="md:w-2/3 space-y-6 bg-white p-8 rounded-sm shadow-sm border border-[#EFEBE4]">
                  <p className="font-light leading-relaxed text-lg">
                    “Nhận thức về giá trị nghề và kỳ vọng về lợi ích là những khía cạnh cần thiết để xem xét động lực tham gia. Bên cạnh đó, khả năng tiếp cận thông tin, vốn, kỹ năng và thời gian có thể ảnh hưởng đến cơ hội tham gia của người làm nghề.
                    Kết quả tự đánh giá gợi ý cần quan tâm hơn đến điều kiện để cộng đồng duy trì sự tham gia, thay vì chỉ xem xét mong muốn bảo tồn.”
                  </p>
                  <div className="bg-[#FAF8F5] p-5 rounded-sm border border-[#C4A47C]/20">
                    <h4 className="font-serif font-bold mb-3 text-sm uppercase tracking-wider text-[#C4A47C]">Dữ liệu liên quan</h4>
                    <ul className="text-sm font-medium space-y-2">
                      <li className="flex justify-between border-b border-[#EFEBE4] pb-1"><span>Nhận thức về giá trị nghề:</span> <span className="text-[#8B7355]">4,0/5</span></li>
                      <li className="flex justify-between border-b border-[#EFEBE4] pb-1"><span>Kỳ vọng về lợi ích:</span> <span className="text-[#8B7355]">3,7/5</span></li>
                      <li className="flex justify-between border-b border-[#EFEBE4] pb-1"><span>Minh bạch thông tin:</span> <span className="text-[#8B7355]">2,8/5</span></li>
                      <li className="flex justify-between"><span>Cơ hội tham gia, vốn và kỹ năng:</span> <span className="text-[#8B7355]">2,7/5</span></li>
                    </ul>
                  </div>
                  <div className="border-l-4 border-red-800/30 pl-5 py-2 bg-red-50/30">
                    <h4 className="font-serif font-bold text-lg mb-1 text-[#8B7355]">Câu hỏi phản biện:</h4>
                    <p className="italic text-[#A0522D] font-medium">Có động lực gìn giữ nghề đã đủ để bảo đảm cộng đồng có thể tham gia lâu dài hay chưa?</p>
                  </div>
                  <div className="pt-2">
                    <h4 className="font-medium mb-3 text-sm uppercase tracking-wider text-[#4A3B32]">Cần xem xét thêm:</h4>
                    <ul className="list-disc pl-5 text-sm font-light space-y-2 text-[#4A3B32]/90">
                      <li>Người dân có tiếp cận được thông tin về kế hoạch và hoạt động liên quan đến di sản không?</li>
                      <li>Các hộ sản xuất có điều kiện tiếp cận vốn và kỹ năng cần thiết không?</li>
                      <li>Những yếu tố về thời gian, sinh kế và nguồn lực ảnh hưởng thế nào đến khả năng tham gia?</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* P2 */}
              <div className="flex flex-col md:flex-row-reverse gap-12 items-start">
                <div className="md:w-1/3">
                  <div className="sticky top-24">
                    <h3 className="text-2xl font-serif font-bold text-[#8B7355] mb-4">P2. Cấp độ tham gia</h3>
                    <div className="text-lg italic mb-6 font-serif border-l-2 border-[#8B7355] pl-4 bg-white/50 py-1">Từ thực hành đến chủ động</div>
                    <img src="./trung bay san pham.jpg" alt="Trưng bày sản phẩm lụa" className="w-full h-auto rounded-sm shadow-md" />
                  </div>
                </div>
                <div className="md:w-2/3 space-y-6 bg-white p-8 rounded-sm shadow-sm border border-[#EFEBE4]">
                  <p className="font-light leading-relaxed text-lg">
                    “Sự tham gia có thể thể hiện qua việc trực tiếp sản xuất, gìn giữ kỹ thuật, truyền dạy tri thức, đóng góp ý kiến hoặc cùng xây dựng kế hoạch.
                    Để đánh giá đúng cấp độ tham gia, cần phân biệt việc thực hiện hoạt động theo kế hoạch có sẵn với việc chủ động đề xuất và tham gia quyết định. Điểm số cần được đối chiếu với ghi chép điền dã để xác định hình thức nào được ghi nhận rõ ràng.”
                  </p>
                  <div className="bg-[#FAF8F5] p-5 rounded-sm border border-[#8B7355]/20">
                    <h4 className="font-serif font-bold mb-3 text-sm uppercase tracking-wider text-[#8B7355]">Dữ liệu liên quan</h4>
                    <ul className="text-sm font-medium space-y-2">
                      <li className="flex justify-between border-b border-[#EFEBE4] pb-1"><span>Tham gia thực hành nghề và hoạt động:</span> <span className="text-[#8B7355]">3,1/5*</span></li>
                      <li className="flex justify-between"><span>Chủ động lập kế hoạch, đề xuất sáng kiến:</span> <span className="text-[#8B7355]">khoảng 2,5/5*</span></li>
                    </ul>
                  </div>
                  <div className="border-l-4 border-red-800/30 pl-5 py-2 bg-red-50/30">
                    <h4 className="font-serif font-bold text-lg mb-1 text-[#8B7355]">Câu hỏi phản biện:</h4>
                    <p className="italic text-[#A0522D] font-medium">Người dân đang tham gia với tư cách người thực hiện hay đã có cơ hội định hình cách thức phát triển di sản?</p>
                  </div>
                  <div className="pt-2">
                    <h4 className="font-medium mb-3 text-sm uppercase tracking-wider text-[#4A3B32]">Cần xem xét thêm:</h4>
                    <ul className="list-disc pl-5 text-sm font-light space-y-2 text-[#4A3B32]/90">
                      <li>Người dân có chủ động đề xuất sáng kiến không?</li>
                      <li>Ý kiến của nghệ nhân có được xem xét khi xây dựng hoạt động bảo tồn?</li>
                      <li>Cộng đồng có tham gia từ giai đoạn lập kế hoạch hay chỉ tham gia khi hoạt động đã được quyết định?</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* P3 */}
              <div className="flex flex-col md:flex-row gap-12 items-start">
                <div className="md:w-1/3">
                  <div className="sticky top-24">
                    <h3 className="text-2xl font-serif font-bold text-[#6B7B56] mb-4">P3. Quản trị và quyền lực</h3>
                    <div className="text-lg italic mb-6 font-serif border-l-2 border-[#6B7B56] pl-4 bg-white/50 py-1">Tiếng nói của cộng đồng</div>
                    <img src="./vong co 1.jpg" alt="Vòng cổ lụa thủ công" className="w-full h-auto rounded-sm shadow-md" />
                  </div>
                </div>
                <div className="md:w-2/3 space-y-6 bg-white p-8 rounded-sm shadow-sm border border-[#EFEBE4]">
                  <p className="font-light leading-relaxed text-lg">
                    “Minh bạch thông tin, khả năng trao đổi và mức độ ảnh hưởng đến quyết định là những yếu tố quan trọng trong quản trị di sản có sự tham gia.
                    Điểm tự đánh giá về ảnh hưởng đến quyết định là 2,4/5. Kết quả này gợi mở câu hỏi về cơ hội để người làm nghề đóng góp ý kiến và tác động đến các kế hoạch liên quan. Tuy nhiên, cần đối chiếu với bằng chứng thực địa trước khi kết luận về thực trạng quản trị tại Nam Cao.”
                  </p>
                  <div className="bg-[#FAF8F5] p-5 rounded-sm border border-[#6B7B56]/20">
                    <h4 className="font-serif font-bold mb-3 text-sm uppercase tracking-wider text-[#6B7B56]">Dữ liệu liên quan</h4>
                    <ul className="text-sm font-medium space-y-2">
                      <li className="flex justify-between border-b border-[#EFEBE4] pb-1"><span>Phối hợp giữa các bên, niềm tin:</span> <span className="text-[#8B7355]">3,3/5*</span></li>
                      <li className="flex justify-between"><span>Ảnh hưởng đến quyết định:</span> <span className="text-[#8B7355]">2,4/5</span></li>
                    </ul>
                  </div>
                  <div className="border-l-4 border-red-800/30 pl-5 py-2 bg-red-50/30">
                    <h4 className="font-serif font-bold text-lg mb-1 text-[#8B7355]">Câu hỏi phản biện chính:</h4>
                    <p className="italic text-[#A0522D] font-medium">Ai đang có tiếng nói trong các quyết định liên quan đến tương lai của di sản?</p>
                  </div>
                  <div className="pt-2">
                    <h4 className="font-medium mb-3 text-sm uppercase tracking-wider text-[#4A3B32]">Cần xem xét thêm:</h4>
                    <ul className="list-disc pl-5 text-sm font-light space-y-2 text-[#4A3B32]/90">
                      <li>Cộng đồng có được tham gia thảo luận về kế hoạch phát triển không?</li>
                      <li>Quy trình tiếp nhận và xử lý ý kiến có minh bạch không?</li>
                      <li>Vai trò của nghệ nhân, người dân và doanh nghiệp được xác định như thế nào?</li>
                      <li>Các nhóm khác nhau trong cộng đồng có cơ hội tham gia tương xứng không?</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* P4 */}
              <div className="flex flex-col md:flex-row-reverse gap-12 items-start">
                <div className="md:w-1/3">
                  <div className="sticky top-24">
                    <h3 className="text-2xl font-serif font-bold text-[#A0522D] mb-4">P4. Tính bền vững</h3>
                    <div className="text-lg italic mb-6 font-serif border-l-2 border-[#A0522D] pl-4 bg-white/50 py-1">Duy trì nghề cho tương lai</div>
                    <img src="./khung cui va hoa sen.jpg" alt="Khung cửi và hoa sen" className="w-full h-auto rounded-sm shadow-md" />
                  </div>
                </div>
                <div className="md:w-2/3 space-y-6 bg-white p-8 rounded-sm shadow-sm border border-[#EFEBE4]">
                  <p className="font-light leading-relaxed text-lg">
                    “Tính bền vững của nghề dệt lụa đũi cần được xem xét thông qua điều kiện duy trì sinh kế, thực hành kỹ thuật và trao truyền tri thức giữa các thế hệ.
                    Việc phát triển sản phẩm hoặc quảng bá di sản có thể mở ra cơ hội, nhưng không tự động chứng minh thu nhập được cải thiện hay nghề được bảo đảm lâu dài. Những tác động này cần được đánh giá bằng thông tin phù hợp về đời sống người làm nghề và hoạt động truyền dạy.”
                  </p>
                  <div className="bg-[#FAF8F5] p-5 rounded-sm border border-[#A0522D]/20">
                    <h4 className="font-serif font-bold mb-3 text-sm uppercase tracking-wider text-[#A0522D]">Dữ liệu liên quan</h4>
                    <ul className="text-sm font-medium space-y-2">
                      <li className="flex justify-between border-b border-[#EFEBE4] pb-1"><span>Chỉ báo tổng hợp về tác động:</span> <span className="text-[#8B7355]">3,2/5*</span></li>
                      <li className="flex justify-between"><span>Mức độ hài lòng chung:</span> <span className="text-[#8B7355]">3,4/5*</span></li>
                    </ul>
                  </div>
                  <div className="border-l-4 border-red-800/30 pl-5 py-2 bg-red-50/30">
                    <h4 className="font-serif font-bold text-lg mb-1 text-[#8B7355]">Câu hỏi phản biện:</h4>
                    <p className="italic text-[#A0522D] font-medium">Một làng nghề có thể được xem là phát triển bền vững nếu hoạt động quảng bá được mở rộng nhưng điều kiện duy trì nghề chưa được xác minh?</p>
                  </div>
                  <div className="pt-2">
                    <h4 className="font-medium mb-3 text-sm uppercase tracking-wider text-[#4A3B32]">Cần xem xét thêm:</h4>
                    <ul className="list-disc pl-5 text-sm font-light space-y-2 text-[#4A3B32]/90">
                      <li>Nghề có tạo điều kiện duy trì sinh kế cho người làm nghề không?</li>
                      <li>Tri thức và kỹ thuật thủ công được truyền dạy giữa các thế hệ như thế nào?</li>
                      <li>Người trẻ có cơ hội tiếp cận và tiếp nối nghề không?</li>
                      <li>Có dữ liệu đủ tin cậy về thu nhập, phân phối lợi ích và tác động môi trường không?</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Khối tổng hợp */}
            <div className="mt-20 bg-[#8B7355] text-white p-12 rounded-sm shadow-xl text-center relative overflow-hidden bg-blend-multiply border border-[#C4A47C]">
              {/* Abstract decorative silk lines background */}
              <svg className="absolute inset-0 w-full h-full opacity-10" preserveAspectRatio="none" viewBox="0 0 100 100">
                 <path d="M0 50 C 30 20, 70 80, 100 50" stroke="white" strokeWidth="2" fill="none" />
                 <path d="M0 60 C 40 10, 60 90, 100 60" stroke="white" strokeWidth="1" fill="none" />
              </svg>

              <LotusPattern />
              <h3 className="text-2xl md:text-3xl font-serif font-bold mb-6 relative z-10">Từ tham gia hoạt động đến tham gia quản trị</h3>
              <p className="max-w-4xl mx-auto font-light leading-relaxed mb-10 relative z-10 text-white/90 text-lg">
                “Đánh giá sự tham gia của cộng đồng không nên dừng lại ở việc người dân có mặt trong hoạt động hay trực tiếp thực hành nghề. Cần xem xét đồng thời điều kiện tham gia, hình thức đóng góp, khả năng ảnh hưởng đến quyết định và tác động đối với tính bền vững của di sản.
                Kết quả tự đánh giá hiện có gợi mở những vấn đề cần tiếp tục xác minh, đặc biệt là khả năng tiếp cận thông tin, cơ hội tham gia và vai trò của cộng đồng trong các quyết định liên quan đến di sản.”
              </p>
              
              <div className="flex flex-wrap justify-center items-center gap-2 md:gap-4 font-serif text-lg md:text-xl font-bold mb-6 relative z-10">
                <span className="px-5 py-3 bg-white/10 backdrop-blur-sm rounded-sm border border-white/20">Có mặt</span>
                <span className="text-white/50">→</span>
                <span className="px-5 py-3 bg-white/10 backdrop-blur-sm rounded-sm border border-white/20">Đóng góp</span>
                <span className="text-white/50">→</span>
                <span className="px-5 py-3 bg-white/10 backdrop-blur-sm rounded-sm border border-white/20">Được lắng nghe</span>
                <span className="text-white/50">→</span>
                <span className="px-5 py-3 bg-white/10 backdrop-blur-sm rounded-sm border border-white/20">Có ảnh hưởng</span>
              </div>
              <p className="text-sm italic text-white/70 relative z-10">
                “Đây là chuỗi khái niệm dùng để đặt vấn đề nghiên cứu, không phải kết quả khẳng định rằng cộng đồng Nam Cao đã đạt hoặc chưa đạt từng giai đoạn.”
              </p>
            </div>
          </div>
        )}

        {/* PHẦN 5: GIẢI PHÁP VÀ KẾT LUẬN */}
        {activeTab === 'solutions' && (
          <div className="animate-fade-in">
            <div className="max-w-6xl mx-auto px-4 py-12">
              <div className="text-center mb-16">
                <LotusPattern />
                <h2 className="text-3xl font-serif font-bold mb-4 text-[#8B7355]">Hướng tới tương lai bền vững</h2>
                <div className="w-16 h-[1px] bg-[#C4A47C] mx-auto"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                <div className="bg-white p-8 border-l-4 border-[#C4A47C] shadow-sm hover:shadow-md hover:-translate-y-1 transition-all rounded-sm">
                  <h3 className="font-serif font-bold text-xl mb-3 text-[#4A3B32]">1. Minh bạch thông tin</h3>
                  <p className="text-sm font-medium italic text-[#C4A47C] mb-5 bg-[#FAF8F5] p-3 rounded-sm">“Cung cấp thông tin rõ ràng về kế hoạch, hoạt động và cơ hội tham gia để người dân chủ động nắm bắt.”</p>
                  <ul className="text-sm font-light space-y-2 list-disc pl-4 text-[#4A3B32]/90">
                    <li>Công khai thông tin về hoạt động liên quan đến di sản.</li>
                    <li>Xây dựng hình thức thông báo phù hợp với các nhóm người dân.</li>
                    <li>Tạo điều kiện để người làm nghề tiếp cận thông tin kịp thời.</li>
                  </ul>
                </div>
                
                <div className="bg-white p-8 border-l-4 border-[#C4A47C] shadow-sm hover:shadow-md hover:-translate-y-1 transition-all rounded-sm">
                  <h3 className="font-serif font-bold text-xl mb-3 text-[#4A3B32]">2. Mở rộng cơ hội tham gia</h3>
                  <p className="text-sm font-medium italic text-[#C4A47C] mb-5 bg-[#FAF8F5] p-3 rounded-sm">“Tạo điều kiện để nhiều nhóm trong cộng đồng, bao gồm người làm nghề ở các độ tuổi khác nhau, có thể đóng góp ý kiến.”</p>
                  <ul className="text-sm font-light space-y-2 list-disc pl-4 text-[#4A3B32]/90">
                    <li>Mở rộng cơ hội tham gia thảo luận.</li>
                    <li>Khuyến khích người dân đóng góp ý kiến và đề xuất sáng kiến.</li>
                    <li>Xem xét nhu cầu và điều kiện tham gia của các nhóm khác nhau.</li>
                  </ul>
                </div>

                <div className="bg-white p-8 border-l-4 border-[#8B7355] shadow-sm hover:shadow-md hover:-translate-y-1 transition-all rounded-sm">
                  <h3 className="font-serif font-bold text-xl mb-3 text-[#4A3B32]">3. Nâng cao năng lực cộng đồng</h3>
                  <p className="text-sm font-medium italic text-[#8B7355] mb-5 bg-[#FAF8F5] p-3 rounded-sm">“Hỗ trợ các kỹ năng cần thiết trong quản lý, phát triển sản phẩm, quảng bá và tổ chức hoạt động gắn với di sản.”</p>
                  <ul className="text-sm font-light space-y-2 list-disc pl-4 text-[#4A3B32]/90">
                    <li>Bổ sung kiến thức về quản lý và tổ chức hoạt động di sản.</li>
                    <li>Hỗ trợ kỹ năng phát triển sản phẩm thủ công.</li>
                    <li>Nâng cao năng lực quảng bá và kết nối thị trường.</li>
                    <li>Tạo điều kiện để người làm nghề chủ động tham gia xây dựng sáng kiến.</li>
                  </ul>
                </div>

                <div className="bg-white p-8 border-l-4 border-[#8B7355] shadow-sm hover:shadow-md hover:-translate-y-1 transition-all rounded-sm">
                  <h3 className="font-serif font-bold text-xl mb-3 text-[#4A3B32]">4. Tăng cường tiếng nói và chia sẻ lợi ích</h3>
                  <p className="text-sm font-medium italic text-[#8B7355] mb-5 bg-[#FAF8F5] p-3 rounded-sm">“Khuyến khích cộng đồng tham gia thảo luận, đề xuất phương án; làm rõ vai trò, trách nhiệm và lợi ích của các bên liên quan.”</p>
                  <ul className="text-sm font-light space-y-2 list-disc pl-4 text-[#4A3B32]/90">
                    <li>Tạo cơ chế tiếp nhận và phản hồi ý kiến.</li>
                    <li>Khuyến khích nghệ nhân và người dân tham gia xây dựng kế hoạch.</li>
                    <li>Làm rõ trách nhiệm của các bên liên quan.</li>
                    <li>Tăng tính minh bạch trong thỏa thuận và phân phối lợi ích.</li>
                  </ul>
                </div>
                
                <div className="bg-white p-8 border-l-4 border-[#6B7B56] shadow-sm md:col-span-2 hover:shadow-md hover:-translate-y-1 transition-all rounded-sm">
                  <div className="flex flex-col md:flex-row gap-8">
                    <div className="md:w-2/3">
                      <h3 className="font-serif font-bold text-xl mb-3 text-[#4A3B32]">5. Gắn bảo tồn với truyền nghề và phát triển bền vững</h3>
                      <p className="text-sm font-medium italic text-[#6B7B56] mb-5 bg-[#FAF8F5] p-3 rounded-sm">“Quan tâm đến điều kiện duy trì sinh kế, cơ hội học nghề của thế hệ trẻ và việc gìn giữ tri thức, kỹ năng thủ công.”</p>
                      <ul className="text-sm font-light space-y-2 list-disc pl-4 text-[#4A3B32]/90">
                        <li>Khuyến khích hoạt động truyền dạy kỹ thuật thủ công.</li>
                        <li>Tạo cơ hội để thế hệ trẻ tiếp cận nghề.</li>
                        <li>Xem xét mối liên hệ giữa thu nhập và khả năng duy trì nghề.</li>
                        <li>Đánh giá tác động của hoạt động phát triển di sản dựa trên dữ liệu phù hợp.</li>
                      </ul>
                    </div>
                    <div className="md:w-1/3">
                      <img src="./trung canh lua.jpg" alt="Sản phẩm lụa Nam Cao" className="w-full h-full object-cover rounded-sm shadow-md" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-[#EFEBE4] text-center p-5 rounded-sm text-sm font-light italic mb-16 border border-[#C4A47C]/40 shadow-inner">
                “Các định hướng trên được đề xuất từ khung phân tích nghiên cứu. Việc lựa chọn ưu tiên và tổ chức thực hiện cần dựa trên nhu cầu, nguồn lực và bằng chứng thực tế thu thập tại địa phương.”
              </div>

              <div className="mb-16 pb-16 border-b border-[#C4A47C]/30 relative">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#FAF8F5] px-4"><LotusPattern /></div>
                <h3 className="text-3xl font-serif font-bold mb-8 text-center text-[#8B7355] mt-10">Kết luận nghiên cứu</h3>
                <div className="max-w-4xl mx-auto space-y-5 font-light text-lg leading-relaxed text-justify px-6 border-l border-r border-[#C4A47C]/20">
                  <p>
                    “Đánh giá sự tham gia của cộng đồng trong bảo tồn và phát triển di sản làng lụa đũi Nam Cao cần xem xét cả điều kiện tham gia, hình thức thực hành, vai trò trong quản trị và tính bền vững của nghề.
                  </p>
                  <p>
                    Kết quả tự đánh giá của nhóm là cơ sở để nhận diện những chỉ báo đáng chú ý và xác định các vấn đề cần tiếp tục làm rõ. Định hướng quan trọng là chuyển từ việc chỉ huy động cộng đồng tham gia hoạt động sang tạo điều kiện để tri thức, tiếng nói và nhu cầu của người làm nghề được xem xét trong quá trình quản lý, bảo tồn và phát triển di sản.”
                  </p>
                </div>
              </div>
            </div>

            {/* Visual Ending */}
            <div className="relative w-full h-[60vh] flex items-center justify-center overflow-hidden mb-20">
              <img src="./bst khan hoa sen.jpg" alt="Lụa và hoa sen" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-[#4A3B32]/75 mix-blend-multiply"></div>
              
              <div className="relative z-10 text-center max-w-4xl px-4 text-white">
                <h2 className="text-3xl md:text-5xl font-serif font-bold mb-8 tracking-wider leading-tight drop-shadow-lg">
                  GIỮ NGHỀ – GÌN BẢN SẮC – <br className="hidden md:block" />PHÁT HUY VAI TRÒ CỘNG ĐỒNG – <br className="hidden md:block" />HƯỚNG TỚI TƯƠNG LAI BỀN VỮNG.
                </h2>
                <div className="w-20 h-[2px] bg-[#C4A47C] mx-auto mb-8"></div>
                <p className="text-xl md:text-2xl font-serif italic text-white/90 drop-shadow-md">
                  “Làm thế nào để người gìn giữ di sản cũng có tiếng nói trong việc quyết định tương lai của di sản?”
                </p>
              </div>
            </div>

            {/* Tài liệu tham khảo */}
            <div className="max-w-5xl mx-auto px-4 py-12 pb-24 border-t border-[#C4A47C]/20 bg-[#FAF8F5]">
              <div className="text-center mb-12">
                <h3 className="text-2xl font-serif font-bold text-[#8B7355] mb-3 uppercase tracking-widest">Tài liệu tham khảo</h3>
                <div className="w-16 h-[1px] bg-[#C4A47C] mx-auto mb-6"></div>
                <LotusPattern />
              </div>
              
              <div className="space-y-12">
                {['Nhóm 1. Khung lý thuyết và đánh giá sự tham gia', 'Nhóm 2. Bảo tồn di sản và nguyên tắc tham gia của cộng đồng', 'Nhóm 3. Bối cảnh di sản và phát triển du lịch tại Việt Nam'].map((groupName, groupIdx) => (
                  <div key={groupIdx} className="bg-white p-8 rounded-sm shadow-sm border border-[#EFEBE4]">
                    <h4 className="font-serif font-bold text-lg text-[#6B7B56] mb-6 border-b border-[#EFEBE4] pb-3">
                      {groupName}
                    </h4>
                    <ul className="space-y-5 pl-0 list-none">
                      {references.filter(ref => ref.group === groupName).map((ref) => (
                        <li key={ref.id} className="text-sm font-light leading-relaxed pl-6 -indent-6 hover:bg-[#FAF8F5] transition-colors p-3 rounded-sm border-l-2 border-transparent hover:border-[#C4A47C]">
                          <span className="font-medium text-[#8B7355]">{ref.id}.</span> {ref.authors} ({ref.year}). {ref.title}. <span className="italic">{ref.source}</span>
                          {ref.link && (
                            <a href={ref.link} target="_blank" rel="noopener noreferrer" className="block mt-1 text-[#C4A47C] hover:text-[#8B7355] hover:underline transition-all break-words">
                              {ref.link}
                            </a>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="bg-[#4A3B32] text-white/70 py-10 text-center text-sm font-light border-t-4 border-[#8B7355]">
        <LotusPattern />
        <p className="mb-2 uppercase tracking-widest text-white/50 text-xs mt-4">Nam Cao Heritage Project</p>
        <p>© 2026. Lắng nghe cộng đồng – Gìn giữ nghề truyền thống.</p>
      </footer>
      
      <button 
        onClick={scrollToTop}
        className="fixed bottom-6 left-6 bg-white/90 p-2 rounded-full shadow-md text-[#8B7355] hover:bg-[#8B7355] hover:text-white transition-all backdrop-blur-sm border border-[#C4A47C]/40 z-50 group"
      >
        <ArrowUpCircle size={24} className="group-hover:animate-bounce" />
      </button>
    </div>
  );
}