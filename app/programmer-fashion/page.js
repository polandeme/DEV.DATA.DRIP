'use client';
import { useState } from 'react';
import Image from 'next/image';
import styles from './fashion.module.css';

const fashionData = [
    {
        id: 'minimalist',
        title: '全栈极简风',
        subtitle: '棉质构建的高效',
        image: '/images/fashion/minimalist.png',
        specs: {
            comfort: '9/10',
            time: '30秒出门',
            vibe: '低调沉稳'
        },
        description: "专为追求效率的开发者设计。这套黑色高领套装在无声中表达着'少即是多'的审美哲学。",
        items: ['纯色黑T恤', '原色牛仔裤', '小白鞋'],
        stack: [
            { name: '优衣库 U系列 T恤', price: '¥99' },
            { name: 'A.P.C. 牛仔裤', price: '¥1,200' },
            { name: 'Common Projects 休闲鞋', price: '¥2,800' }
        ],
        compatibility: {
            best: '技术分享会, 咖啡厅办公',
            avoid: '正式商务晚宴'
        }
    },
    {
        id: 'cyberpunk',
        title: '机能未来风',
        subtitle: '雨夜与霓虹',
        image: '/images/fashion/cyberpunk.png',
        specs: {
            comfort: '7/10',
            utility: '超强收纳',
            weather: '全天候防雨'
        },
        description: "随时准备应对各种天气。配备多个功能口袋，可装载移动硬盘、能量饮料和随身设备。",
        items: ['硬壳冲锋衣', '束脚工装裤', '防水球鞋'],
        stack: [
            { name: 'ACRONYM 外套', price: '¥12,000' },
            { name: 'Nike ISPA 长裤', price: '¥1,499' },
            { name: '机能风运动鞋', price: '¥3,500' }
        ],
        compatibility: {
            best: '音乐节, 下雨的通勤路',
            avoid: '传统HR面试'
        }
    },
    {
        id: 'smart-casual',
        title: '商务休闲风',
        subtitle: '技术管理者的选择',
        image: '/images/fashion/smart-casual.png',
        specs: {
            comfort: '8/10',
            formal: '中等偏上',
            role: 'CTO/架构师'
        },
        description: "既能进行代码Review，又能自信地面对投资人。连接工程部与管理层的桥梁风格。",
        items: ['休闲西装', '卡其裤', '皮靴'],
        stack: [
            { name: 'Theory 休闲西装', price: '¥3,200' },
            { name: 'Lululemon 休闲裤', price: '¥980' },
            { name: 'Red Wing 工装靴', price: '¥2,400' }
        ],
        compatibility: {
            best: '架构评审, 投资人会议',
            avoid: '通宵加班'
        }
    },
    {
        id: 'wfh',
        title: '居家舒适风',
        subtitle: '零延迟的自在',
        image: '/images/fashion/wfh.png',
        specs: {
            comfort: '10/10',
            relax: '满分',
            pants: '开心就好'
        },
        description: "为居家办公和午睡优化。这套穿搭主打极致的亲肤体验，从不在意他人的目光。",
        items: ['高级卫衣', '软绵卫裤', '羊毛袜'],
        stack: [
            { name: 'Reigning Champ 卫衣', price: '¥1,100' },
            { name: 'Roots 居家裤', price: '¥450' },
            { name: 'Smartwool 袜子', price: '¥180' }
        ],
        compatibility: {
            best: '写代码, 视频会议(仅上半身)',
            avoid: '需要开摄像头的全身站立'
        }
    },
    {
        id: 'digital-nomad',
        title: '数字游民风',
        subtitle: '巴厘岛的自由',
        image: '/images/fashion/digital-nomad.png',
        specs: {
            comfort: '9/10',
            breathable: '极佳',
            mood: '度假感'
        },
        description: "只要有网，哪里都是办公室。亚麻材质保证在热带气候下依然保持冷静清爽。",
        items: ['亚麻衬衫', '功能短裤', '凉鞋'],
        stack: [
            { name: 'MUJI 亚麻衬衫', price: '¥248' },
            { name: 'Patagonia 短裤', price: '¥499' },
            { name: 'Birkenstock 凉鞋', price: '¥899' }
        ],
        compatibility: {
            best: '海边咖啡厅, 远程工作',
            avoid: '空调很冷的机房'
        }
    },
    {
        id: 'valley-founder',
        title: '硅谷精英风',
        subtitle: '经典的灰马甲',
        image: '/images/fashion/valley-founder.png',
        specs: {
            comfort: '8.5/10',
            item: '摇粒绒马甲',
            status: '创业者'
        },
        description: "看起来随性，实际上这身行头经过精心挑选。灰色马甲已成为科技圈的某种身份符号。",
        items: ['羊毛背心', '美丽奴T恤', '羊毛鞋'],
        stack: [
            { name: 'Patagonia 摇粒绒背心', price: '¥1,199' },
            { name: 'Icebreaker T恤', price: '¥699' },
            { name: 'Allbirds 羊毛鞋', price: '¥899' }
        ],
        compatibility: {
            best: 'TechCrunch访谈, 路演',
            avoid: '需要穿正装的银行'
        }
    },
    {
        id: 'os-sage',
        title: '复古工装风',
        subtitle: '越久越有味道',
        image: '/images/fashion/os-sage.png',
        specs: {
            comfort: '6/10',
            durability: '极高',
            style: '阿美咔叽'
        },
        description: "经久耐用，就像稳定运行的底层代码。不需要追逐潮流，只需要可靠的经典款。",
        items: ['法兰绒衬衫', '牛仔裤', '机械表'],
        stack: [
            { name: 'Filson 法兰绒衬衫', price: '¥1,200' },
            { name: 'Vintage Levi\'s 501', price: '¥800' },
            { name: 'Seiko 机械表', price: '¥1,500' }
        ],
        compatibility: {
            best: '户外露营, 技术研讨会',
            avoid: '夏季户外'
        }
    },
    {
        id: 'genz-frontend',
        title: '潮流前端风',
        subtitle: '新世代的个性',
        image: '/images/fashion/genz-frontend.png',
        specs: {
            comfort: '9/10',
            swag: '满分',
            fit: 'Oversize'
        },
        description: "宽松版型是标配，个性贴纸是信仰。不仅代码写得快，穿搭也要够酷够帅。",
        items: ['宽松卫衣', '工装牛仔', '限量球鞋'],
        stack: [
            { name: 'Supreme 卫衣', price: '¥3,500' },
            { name: 'Carhartt 双膝裤', price: '¥1,199' },
            { name: 'Nike SB Dunk', price: '¥2,800' }
        ],
        compatibility: {
            best: '创意工作室, 社交媒体出镜',
            avoid: '传统国企环境'
        }
    },
    {
        id: 'hardware-hacker',
        title: '硬核工装风',
        subtitle: '实用的工具感',
        image: '/images/fashion/hardware-hacker.png',
        specs: {
            comfort: '5/10',
            pockets: '很多',
            safety: '防护级'
        },
        description: "口袋里装的是万用表不是手机。防静电，耐磨，防烫伤，一切为了动手创造。",
        items: ['多袋马甲', '耐磨帆布裤', '护目镜'],
        stack: [
            { name: 'Carhartt 工装背心', price: '¥899' },
            { name: 'Dickies 874', price: '¥399' },
            { name: '安全护目镜', price: '¥150' }
        ],
        compatibility: {
            best: '创客空间, 电子实验室',
            avoid: '纯软件外包公司'
        }
    }
];

const seasonalData = {
    spring: {
        title: '春季指南',
        quote: '// 灵活应对温差',
        image: '/images/fashion/season-spring.png',
        description: '春季气温像需求一样多变。核心策略是“洋葱式穿衣”，方便穿脱。',
        weather: [
            { condition: '早晚温差大', action: '建议：带拉链的卫衣 (随时调节)' },
            { condition: '偶发阵雨', action: '建议：防泼水风衣 (保持干爽)' },
            { condition: '花粉季节', action: '建议：舒适的口罩 (防护)' }
        ]
    },
    summer: {
        title: '夏季指南',
        quote: '// 保持清爽散热',
        image: '/images/fashion/season-summer.png',
        description: '避免闷热出汗是第一要务。选择高科技透气面料，保持体感舒适。',
        weather: [
            { condition: '高温酷暑', action: '建议：凉感科技T恤 (快速散热)' },
            { condition: '通勤出汗', action: '建议：多备一件T恤 (时刻清爽)' },
            { condition: '阳光刺眼', action: '建议：偏光墨镜 (保护视力)' }
        ]
    },
    autumn: {
        title: '秋季指南',
        quote: '// 经典叠穿季节',
        image: '/images/fashion/season-autumn.png',
        description: '程序员最舒适的季节。衬衫搭配背心，既有层次感又保暖。',
        weather: [
            { condition: '秋高气爽', action: '建议：法兰绒衬衫 (质感之选)' },
            { condition: '微风渐凉', action: '建议：抓绒背心 (护住核心体温)' },
            { condition: '落叶满地', action: '建议：沙漠靴 (舒适耐脏)' }
        ]
    },
    winter: {
        title: '冬季指南',
        quote: '// 温暖防护模式',
        image: '/images/fashion/season-winter.png',
        description: '全副武装的保暖模式。在室内暖气与室外严寒中自由切换。',
        weather: [
            { condition: '严寒暴雪', action: '建议：Gore-Tex 羽绒服 (防风防水)' },
            { condition: '头部保暖', action: '建议：羊毛冷帽 (防止热量流失)' },
            { condition: '手机操作', action: '建议：触屏手套 (不冻手)' }
        ]
    }
};

const fashionLinterData = [
    { type: 'error', code: 'Notice', msg: '检测到活动纪念衫浓度过高。', fix: '建议：换成质感更好的纯色T恤。' },
    { type: 'warn', code: 'Tip', msg: '跑鞋和牛仔裤的搭配略显违和。', fix: '建议：尝试一下复古跑鞋或工装靴。' },
    { type: 'warn', code: 'Tip', msg: '双肩包肩带压坏了西装的肩型。', fix: '建议：该场景下改用手提包。' },
    { type: 'error', code: 'Alert', msg: '袜子颜色和裤子脱节了。', fix: '建议：袜子颜色尽量与裤子或鞋子呼应。' }
];

const styleBugs = [
    { bug: '活动T恤依赖症', desc: '衣柜里全是各大会议送的免费T恤，显得比较随意。', fix: '投资一些无Logo的基础款，更有质感。' },
    { bug: '运动装误用', desc: '在非运动场合穿速干衣或太过专业的跑鞋。', fix: '选择棉、麻、丹宁等更有生活气息的面料。' },
    { bug: '裤脚堆积', desc: '裤子太长堆在鞋面上，显得腿短且拖沓。', fix: '找裁缝改短一点，或者卷个裤脚。' }
];

const peripherals = [
    { rank: '01', name: '降噪耳机', desc: 'Sony / Bose。给自己一个安静的专注空间。' },
    { rank: '02', name: '机械键盘', desc: 'Keychron / NuPhy。指尖的舒适敲击感。' },
    { rank: '03', name: '舒适眼镜', desc: 'Lindberg / Mykita。轻若无物，保护眼睛。' },
    { rank: '04', name: '双肩背包', desc: 'Aer / Peak Design。收纳井井有条。' }
];

function SeasonalGuide() {
    const [activeSeason, setActiveSeason] = useState('spring');

    return (
        <section className={styles.seasonalSection}>
            <h2 className={styles.sectionTitle}>四季穿搭指南</h2>

            <div className={styles.seasonTabs}>
                {['spring', 'summer', 'autumn', 'winter'].map((season) => (
                    <button
                        key={season}
                        className={`${styles.seasonTab} ${activeSeason === season ? styles.active : ''}`}
                        onClick={() => setActiveSeason(season)}
                    >
                        {seasonalData[season].title}
                    </button>
                ))}
            </div>

            <div className={styles.seasonContent}>
                <div className={styles.seasonImageWrapper}>
                    <Image
                        src={seasonalData[activeSeason].image}
                        alt={seasonalData[activeSeason].title}
                        fill
                        className={styles.modalImage}
                        sizes="(max-width: 900px) 100vw, 50vw"
                    />
                </div>

                <div className={styles.seasonInfo}>
                    <span className={styles.seasonQuote}>{seasonalData[activeSeason].quote}</span>
                    <h3>{seasonalData[activeSeason].title}</h3>
                    <p className={styles.description} style={{ fontSize: '1.2rem' }}>{seasonalData[activeSeason].description}</p>

                    <div className={styles.weatherProtocol}>
                        <span className={styles.weatherTitle}>天气与场景贴士</span>
                        <div className={styles.weatherList}>
                            {seasonalData[activeSeason].weather.map((item, index) => (
                                <div key={index} className={styles.weatherItem}>
                                    <span className={styles.weatherCondition}>{item.condition}</span>
                                    <span className={styles.weatherAction}>{item.action}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function FashionLinter() {
    const [logs, setLogs] = useState([]);
    const [isRunning, setIsRunning] = useState(false);

    const runLinter = () => {
        setIsRunning(true);
        setLogs([]);
        let count = 0;
        const interval = setInterval(() => {
            if (count >= 5) {
                clearInterval(interval);
                setIsRunning(false);
                setLogs(prev => [...prev, { type: 'success', msg: '自检完成！今天也是帅气的一天。' }]);
                return;
            }

            // Randomly pick errors/warnings
            const randomItem = fashionLinterData[Math.floor(Math.random() * fashionLinterData.length)];
            setLogs(prev => [...prev, randomItem]);
            count++;
        }, 600);
    };

    return (
        <div className={styles.linterContainer}>
            <div className={styles.linterHeader}>
                <span className={`${styles.dot} ${styles.red}`}></span>
                <span className={`${styles.dot} ${styles.yellow}`}></span>
                <span className={`${styles.dot} ${styles.green}`}></span>
                <span style={{ color: '#555', marginLeft: 'auto', fontSize: '0.8rem' }}>Style Check</span>
            </div>
            <div className={styles.terminalOutput}>
                <div className={styles.logLine}>
                    <span className={styles.prompt}>➜</span>
                    <span className={styles.cmd}>正在运行风格自检...</span>
                </div>
                {logs.map((log, i) => (
                    <div key={i} style={{ marginTop: '8px' }}>
                        {log.type === 'error' && <span className={styles['log-error']}>[注意] </span>}
                        {log.type === 'warn' && <span className={styles['log-warn']}>[提示] </span>}
                        {log.type === 'success' && <span className={styles['log-success']}>[完成] </span>}
                        <span>{log.msg}</span>
                        {log.fix && <div style={{ color: '#565f89', paddingLeft: '20px', fontSize: '0.85rem' }}>↳ {log.fix}</div>}
                    </div>
                ))}
                {isRunning && <span className={styles.cursor}>_</span>}
            </div>
            <button className={styles.linterBtn} onClick={runLinter} disabled={isRunning}>
                {isRunning ? '自检中...' : '点击运行风格自检'}
            </button>
        </div>
    );
}

function ExpansionModules() {
    return (
        <section className={styles.expansionSection}>
            <h2 className={styles.sectionTitle}>更多推荐</h2>

            <FashionLinter />

            <div className={styles.dualCol}>
                {/* Debugger */}
                <div className={styles.moduleBox}>
                    <h3 style={{ marginBottom: '24px', fontSize: '1.5rem' }}>穿搭常见误区</h3>
                    {styleBugs.map((bug, i) => (
                        <div key={i} className={styles.bugItem}>
                            <div className={styles.bugIcon}>?</div>
                            <div className={styles.bugContent}>
                                <h4>{bug.bug}</h4>
                                <p className={styles.bugDesc}>{bug.desc}</p>
                                <div className={styles.fixHighlight}>→ 建议: {bug.fix}</div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Peripherals */}
                <div className={styles.moduleBox}>
                    <h3 style={{ marginBottom: '24px', fontSize: '1.5rem' }}>精选配饰</h3>
                    <div className={styles.periGrid}>
                        <div style={{ marginBottom: '20px', borderRadius: '8px', overflow: 'hidden', height: '180px', position: 'relative' }}>
                            <Image
                                src="/images/fashion/accessories-flatlay.png"
                                alt="Accessories"
                                fill
                                style={{ objectFit: 'cover' }}
                            />
                        </div>
                        {peripherals.map((peri, i) => (
                            <div key={i} className={styles.periItem}>
                                <span className={styles.periRank}>{peri.rank}</span>
                                <div className={styles.periInfo}>
                                    <h5>{peri.name}</h5>
                                    <p className={styles.periDesc}>{peri.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default function ProgrammerFashion() {
    const [selectedItem, setSelectedItem] = useState(null);
    const [theme, setTheme] = useState('dark');

    const toggleTheme = () => {
        setTheme(prev => prev === 'dark' ? 'light' : 'dark');
    };

    return (
        <div className={styles.container} data-theme={theme}>
            <button className={styles.themeToggle} onClick={toggleTheme}>
                {theme === 'dark' ? '☀️ 明亮模式' : '🌙 深色模式'}
            </button>

            <header className={styles.hero}>
                <h1 className={styles.title}>程序员穿搭指南</h1>
                <p className={styles.subtitle}>简单且高效的穿衣逻辑</p>
            </header>

            <main className={styles.grid}>
                {fashionData.map((item) => (
                    <div
                        key={item.id}
                        className={styles.card}
                        onClick={() => setSelectedItem(item)}
                        style={{ cursor: 'pointer' }}
                    >
                        <div className={styles.imageWrapper}>
                            <Image
                                src={item.image}
                                alt={item.title}
                                fill
                                className={styles.image}
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                        </div>

                        <div className={styles.content}>
                            <span className={styles.cardSubtitle}>{item.subtitle}</span>
                            <div className={styles.cardHeader}>
                                <h2 className={styles.cardTitle}>{item.title}</h2>
                            </div>

                            <div className={styles.specs}>
                                {Object.entries(item.specs).map(([key, value]) => (
                                    <div key={key} className={styles.specRow}>
                                        <span className={styles.specLabel}>{key === 'comfort' ? '舒适度' : key.toUpperCase()}:</span>
                                        <span className={styles.specValue}>{value}</span>
                                    </div>
                                ))}
                            </div>

                            <p className={styles.description}>{item.description}</p>

                            <div className={styles.tags}>
                                {item.items.map((tag) => (
                                    <span key={tag} className={styles.tag}>{tag}</span>
                                ))}
                            </div>

                            <button className={styles.button}>
                                查看详情
                            </button>
                        </div>
                    </div>
                ))}
            </main>

            {/* Seasonal Guide */}
            <SeasonalGuide />

            {/* Expansion Modules */}
            <ExpansionModules />

            {/* Modal */}
            <div className={`${styles.modalOverlay} ${selectedItem ? styles.active : ''}`} onClick={() => setSelectedItem(null)}>
                {selectedItem && (
                    <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                        <button className={styles.closeButton} onClick={() => setSelectedItem(null)}>×</button>

                        <div className={styles.modalImageCol}>
                            <Image
                                src={selectedItem.image}
                                alt={selectedItem.title}
                                fill
                                className={styles.modalImage}
                                sizes="(max-width: 900px) 100vw, 50vw"
                            />
                        </div>

                        <div className={styles.modalInfoCol}>
                            <span className={styles.modalSubtitle}>{selectedItem.subtitle}</span>
                            <h2 className={styles.modalTitle}>{selectedItem.title}</h2>
                            <p className={styles.description} style={{ fontSize: '1.1rem' }}>{selectedItem.description}</p>

                            <div className={styles.modalSectionTitle}>推荐核心单品</div>
                            <div className={styles.stackList}>
                                {selectedItem.stack.map((gear, index) => (
                                    <div key={index} className={styles.stackItem}>
                                        <span className={styles.itemName}>{gear.name}</span>
                                        <span className={styles.itemPrice}>{gear.price}</span>
                                    </div>
                                ))}
                            </div>

                            <div className={styles.modalSectionTitle}>场景指南</div>
                            <div className={styles.compatMatrix}>
                                <div className={`${styles.compatItem} ${styles.good}`}>
                                    <span className={styles.compatLabel}>推荐场景</span>
                                    <span className={styles.compatValue}>{selectedItem.compatibility.best}</span>
                                </div>
                                <div className={`${styles.compatItem} ${styles.bad}`}>
                                    <span className={styles.compatLabel}>避免场景</span>
                                    <span className={styles.compatValue}>{selectedItem.compatibility.avoid}</span>
                                </div>
                            </div>

                            <button className={styles.actionButton}>
                                加入愿望单
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
