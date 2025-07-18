// 景点服务 - 使用Mock数据
import type { Destination } from '../data/destinations'

export interface SpotLocation {
  lat: string
  lon: string
}

export interface SpotTicket {
  id: string
  type: string
  name: string
  price: number
  originalPrice?: number
  description: string
  validDays: number
  stock: number
}

export interface SpotItem {
  id: string
  name: string
  address: string
  areaName: string
  cityName: string
  proName: string
  summary: string
  location: SpotLocation
  picList: string[]
  tickets: SpotTicket[]
  rating: number
  reviewCount: number
  openTime: string
  phone?: string
  website?: string
  tags: string[]
}

export interface SpotSearchParams {
  keyword?: string
  cityName?: string
  proName?: string
  page?: number
  pageSize?: number
}

class SpotService {
  private readonly mockSpots: SpotItem[] = [
    {
      id: "spot_001",
      name: "故宫博物院",
      address: "北京市东城区景山前街4号",
      areaName: "东城区",
      cityName: "北京",
      proName: "北京市",
      summary: "明清两朝的皇家宫殿，世界文化遗产，中国古代宫廷建筑之精华。收藏有大量珍贵文物，是了解中华文明的重要窗口。",
      location: { lat: "39.916668", lon: "116.397026" },
      picList: ["https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=400&h=200&fit=crop"],
      tickets: [
        { id: "t001_1", type: "adult", name: "成人票", price: 60, originalPrice: 80, description: "成人门票，包含主要宫殿参观", validDays: 1, stock: 500 },
        { id: "t001_2", type: "student", name: "学生票", price: 30, description: "学生优惠票（需持学生证）", validDays: 1, stock: 200 },
        { id: "t001_3", type: "child", name: "儿童票", price: 20, description: "儿童票（6-12岁）", validDays: 1, stock: 100 }
      ],
      rating: 4.8,
      reviewCount: 12580,
      openTime: "08:30-17:00",
      phone: "010-85007421",
      website: "https://www.dpm.org.cn",
      tags: ["历史文化", "世界遗产", "皇家建筑"]
    },
    {
      id: "spot_002",
      name: "西湖风景名胜区",
      address: "浙江省杭州市西湖区",
      areaName: "西湖区",
      cityName: "杭州",
      proName: "浙江省",
      summary: "杭州西湖，以秀丽的湖光山色和众多的名胜古迹闻名中外。苏堤春晓、断桥残雪、雷峰夕照等十景享誉天下。",
      location: { lat: "30.2741", lon: "120.1551" },
      picList: ["https://images.unsplash.com/photo-1549693578-d683be217e58?w=400&h=200&fit=crop"],
      tickets: [
        { id: "t002_1", type: "boat", name: "游船票", price: 55, description: "西湖游船，环湖观光", validDays: 1, stock: 300 },
        { id: "t002_2", type: "combo", name: "景区通票", price: 120, originalPrice: 150, description: "包含雷峰塔、岳王庙等景点", validDays: 2, stock: 200 }
      ],
      rating: 4.7,
      reviewCount: 8960,
      openTime: "全天开放",
      phone: "0571-87977767",
      tags: ["自然风光", "古典园林", "文化名胜"]
    },
    {
      id: "spot_003",
      name: "泰山风景名胜区",
      address: "山东省泰安市泰山区",
      areaName: "泰山区",
      cityName: "泰安",
      proName: "山东省",
      summary: "五岳之首，中华民族的象征，世界文化与自然双重遗产。登泰山而小天下，体验中华文化的博大精深。",
      location: { lat: "36.2548", lon: "117.1009" },
      picList: ["https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=200&fit=crop"],
      tickets: [
        { id: "t003_1", type: "adult", name: "成人门票", price: 115, description: "泰山景区门票", validDays: 1, stock: 400 },
        { id: "t003_2", type: "cable", name: "索道往返票", price: 200, description: "中天门-南天门往返索道", validDays: 1, stock: 150 },
        { id: "t003_3", type: "combo", name: "门票+索道", price: 280, originalPrice: 315, description: "门票+往返索道优惠套餐", validDays: 1, stock: 100 }
      ],
      rating: 4.6,
      reviewCount: 15420,
      openTime: "06:00-17:30",
      phone: "0538-8266666",
      tags: ["名山大川", "世界遗产", "登山健身"]
    },
    {
      id: "spot_004",
      name: "黄山风景区",
      address: "安徽省黄山市黄山区",
      areaName: "黄山区",
      cityName: "黄山",
      proName: "安徽省",
      summary: "中国著名风景区，以奇松、怪石、云海、温泉四绝著称。被誉为'天下第一奇山'。",
      location: { lat: "30.1340", lon: "118.1673" },
      picList: ["https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=400&h=200&fit=crop"],
      tickets: [
        { id: "t004_1", type: "adult", name: "成人门票", price: 190, description: "黄山风景区门票", validDays: 1, stock: 600 },
        { id: "t004_2", type: "cable", name: "云谷索道", price: 80, description: "云谷索道单程票", validDays: 1, stock: 200 },
        { id: "t004_3", type: "student", name: "学生票", price: 95, description: "学生优惠门票", validDays: 1, stock: 150 }
      ],
      rating: 4.9,
      reviewCount: 9870,
      openTime: "06:00-17:30",
      phone: "0559-5561111",
      tags: ["名山大川", "奇松怪石", "云海温泉"]
    },
    {
      id: "spot_005",
      name: "天安门广场",
      address: "北京市东城区天安门广场",
      areaName: "东城区",
      cityName: "北京",
      proName: "北京市",
      summary: "中华人民共和国首都北京的心脏，世界最大的城市广场之一，见证了中华民族的辉煌历史。",
      location: { lat: "39.904989", lon: "116.391244" },
      picList: ["https://images.unsplash.com/photo-1570193072419-fce4b2b00a7c?w=400&h=200&fit=crop"],
      tickets: [
        { id: "t005_1", type: "free", name: "免费参观", price: 0, description: "天安门广场免费开放", validDays: 1, stock: 999 }
      ],
      rating: 4.8,
      reviewCount: 25600,
      openTime: "05:00-22:00",
      phone: "010-63095630",
      tags: ["红色旅游", "历史纪念", "爱国主义"]
    },
    {
      id: "spot_006",
      name: "张家界国家森林公园",
      address: "湖南省张家界市武陵源区",
      areaName: "武陵源区",
      cityName: "张家界",
      proName: "湖南省",
      summary: "世界自然遗产，以其独特的石英砂岩峰林地貌著称，是《阿凡达》取景地之一。",
      location: { lat: "29.3406", lon: "110.4419" },
      picList: ["https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=200&fit=crop"],
      tickets: [
        { id: "t006_1", type: "adult", name: "成人门票", price: 245, description: "张家界森林公园门票（4天有效）", validDays: 4, stock: 800 },
        { id: "t006_2", type: "cable", name: "天门山索道", price: 278, description: "天门山索道往返票", validDays: 1, stock: 300 },
        { id: "t006_3", type: "student", name: "学生票", price: 163, description: "学生优惠票", validDays: 4, stock: 200 }
      ],
      rating: 4.7,
      reviewCount: 11200,
      openTime: "07:00-18:00",
      phone: "0744-5712189",
      tags: ["自然风光", "世界遗产", "奇峰异石"]
    },
    {
      id: "spot_007",
      name: "九寨沟",
      address: "四川省阿坝藏族羌族自治州九寨沟县",
      areaName: "九寨沟县",
      cityName: "阿坝州",
      proName: "四川省",
      summary: "世界自然遗产，以其多彩的湖泊、瀑布、雪山和藏族文化而闻名，被誉为'人间仙境'。",
      location: { lat: "33.0820", lon: "103.9038" },
      picList: ["https://images.unsplash.com/photo-1519640760746-95d1211e9a59?w=400&h=200&fit=crop"],
      tickets: [
        { id: "t007_1", type: "adult", name: "成人门票", price: 169, description: "九寨沟景区门票", validDays: 1, stock: 400 },
        { id: "t007_2", type: "bus", name: "观光车票", price: 90, description: "景区内观光车票", validDays: 1, stock: 500 },
        { id: "t007_3", type: "combo", name: "门票+观光车", price: 220, originalPrice: 259, description: "门票+观光车优惠套餐", validDays: 1, stock: 300 }
      ],
      rating: 4.8,
      reviewCount: 7890,
      openTime: "07:00-17:00",
      phone: "0837-7739753",
      tags: ["自然风光", "世界遗产", "湖泊瀑布"]
    },
    {
      id: "spot_008",
      name: "丽江古城",
      address: "云南省丽江市古城区",
      areaName: "古城区",
      cityName: "丽江",
      proName: "云南省",
      summary: "世界文化遗产，中国保存最完整的古城之一，以其独特的纳西族文化和建筑风格著称。",
      location: { lat: "26.8728", lon: "100.2336" },
      picList: ["https://images.unsplash.com/photo-1588647740351-6969e9b97a9e?w=400&h=200&fit=crop"],
      tickets: [
        { id: "t008_1", type: "maintenance", name: "古城维护费", price: 30, description: "丽江古城维护费", validDays: 7, stock: 999 },
        { id: "t008_2", type: "combo", name: "古城+玉龙雪山", price: 520, originalPrice: 580, description: "古城+玉龙雪山一日游", validDays: 1, stock: 150 }
      ],
      rating: 4.6,
      reviewCount: 13450,
      openTime: "全天开放",
      phone: "0888-5123456",
      tags: ["古城古镇", "民族文化", "世界遗产"]
    },
    {
      id: "spot_009",
      name: "桂林山水",
      address: "广西壮族自治区桂林市",
      areaName: "象山区",
      cityName: "桂林",
      proName: "广西",
      summary: "桂林山水甲天下，以其独特的喀斯特地貌和漓江风光著称，是中国最美的山水风景之一。",
      location: { lat: "25.2736", lon: "110.2990" },
      picList: ["https://images.unsplash.com/photo-1574067358754-ac4b4e7d0c18?w=400&h=200&fit=crop"],
      tickets: [
        { id: "t009_1", type: "cruise", name: "漓江游船", price: 210, description: "漓江精华段游船", validDays: 1, stock: 200 },
        { id: "t009_2", type: "combo", name: "象鼻山+叠彩山", price: 150, originalPrice: 180, description: "桂林市内景点套票", validDays: 2, stock: 300 },
        { id: "t009_3", type: "adult", name: "象鼻山门票", price: 70, description: "象鼻山公园门票", validDays: 1, stock: 400 }
      ],
      rating: 4.7,
      reviewCount: 9650,
      openTime: "08:00-17:30",
      phone: "0773-2822222",
      tags: ["山水风光", "喀斯特地貌", "漓江风景"]
    },
    {
      id: "spot_010",
      name: "长城·八达岭",
      address: "北京市延庆区八达岭镇",
      areaName: "延庆区",
      cityName: "北京",
      proName: "北京市",
      summary: "世界文化遗产，中国古代军事防御工程的杰出代表，'不到长城非好汉'的著名景点。",
      location: { lat: "40.3595", lon: "116.0170" },
      picList: ["https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=400&h=200&fit=crop"],
      tickets: [
        { id: "t010_1", type: "adult", name: "成人门票", price: 40, description: "八达岭长城门票", validDays: 1, stock: 1000 },
        { id: "t010_2", type: "cable", name: "索道往返", price: 140, description: "八达岭长城索道往返", validDays: 1, stock: 300 },
        { id: "t010_3", type: "student", name: "学生票", price: 20, description: "学生优惠票", validDays: 1, stock: 200 }
      ],
      rating: 4.5,
      reviewCount: 28900,
      openTime: "07:00-18:00",
      phone: "010-69121226",
      tags: ["世界遗产", "历史文化", "军事建筑"]
    },
    {
      id: "spot_011",
      name: "华山",
      address: "陕西省渭南市华阴市",
      areaName: "华阴市",
      cityName: "渭南",
      proName: "陕西省",
      summary: "五岳之西岳，以其险峻著称，有'奇险天下第一山'之美誉，是登山爱好者的挑战圣地。",
      location: { lat: "34.4883", lon: "110.0854" },
      picList: ["https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=200&fit=crop"],
      tickets: [
        { id: "t011_1", type: "adult", name: "成人门票", price: 160, description: "华山景区门票", validDays: 1, stock: 500 },
        { id: "t011_2", type: "cable", name: "西峰索道", price: 140, description: "西峰索道单程票", validDays: 1, stock: 200 },
        { id: "t011_3", type: "combo", name: "门票+索道", price: 270, originalPrice: 300, description: "门票+西峰索道套餐", validDays: 1, stock: 150 }
      ],
      rating: 4.6,
      reviewCount: 12100,
      openTime: "24小时开放",
      phone: "0913-4362692",
      tags: ["名山大川", "险峻奇峰", "登山挑战"]
    },
    {
      id: "spot_012",
      name: "天坛公园",
      address: "北京市东城区天坛路",
      areaName: "东城区",
      cityName: "北京",
      proName: "北京市",
      summary: "明清两代皇帝祭天的场所，世界文化遗产，中国古代建筑艺术的杰出代表。",
      location: { lat: "39.8822", lon: "116.4066" },
      picList: ["https://images.unsplash.com/photo-1570193072419-fce4b2b00a7c?w=400&h=200&fit=crop"],
      tickets: [
        { id: "t012_1", type: "adult", name: "公园门票", price: 15, description: "天坛公园门票", validDays: 1, stock: 800 },
        { id: "t012_2", type: "combo", name: "公园+祈年殿", price: 35, description: "公园门票+祈年殿联票", validDays: 1, stock: 400 },
        { id: "t012_3", type: "annual", name: "年票", price: 120, description: "天坛公园年票", validDays: 365, stock: 100 }
      ],
      rating: 4.7,
      reviewCount: 8750,
      openTime: "06:00-21:00",
      phone: "010-67013036",
      tags: ["历史文化", "世界遗产", "古建筑"]
    },
    {
      id: "spot_013",
      name: "颐和园",
      address: "北京市海淀区新建宫门路19号",
      areaName: "海淀区",
      cityName: "北京",
      proName: "北京市",
      summary: "中国现存最大的皇家园林，世界文化遗产，集中国古典园林艺术之大成。",
      location: { lat: "39.9997", lon: "116.2752" },
      picList: ["https://images.unsplash.com/photo-1574067358754-ac4b4e7d0c18?w=400&h=200&fit=crop"],
      tickets: [
        { id: "t013_1", type: "adult", name: "成人门票", price: 30, description: "颐和园门票", validDays: 1, stock: 600 },
        { id: "t013_2", type: "combo", name: "门票+园中园", price: 60, description: "门票+佛香阁+苏州街", validDays: 1, stock: 300 },
        { id: "t013_3", type: "student", name: "学生票", price: 15, description: "学生优惠票", validDays: 1, stock: 200 }
      ],
      rating: 4.8,
      reviewCount: 14200,
      openTime: "06:30-18:00",
      phone: "010-62881144",
      tags: ["皇家园林", "世界遗产", "古典建筑"]
    },
    {
      id: "spot_014",
      name: "乐山大佛",
      address: "四川省乐山市南岷江东岸凌云寺侧",
      areaName: "市中区",
      cityName: "乐山",
      proName: "四川省",
      summary: "世界文化遗产，中国最大的石刻佛像，唐代摩崖造像艺术的杰作。",
      location: { lat: "29.5454", lon: "103.7676" },
      picList: ["https://images.unsplash.com/photo-1519640760746-95d1211e9a59?w=400&h=200&fit=crop"],
      tickets: [
        { id: "t014_1", type: "adult", name: "成人门票", price: 80, description: "乐山大佛景区门票", validDays: 1, stock: 400 },
        { id: "t014_2", type: "boat", name: "游船票", price: 70, description: "乐山大佛游船票", validDays: 1, stock: 200 },
        { id: "t014_3", type: "combo", name: "门票+游船", price: 130, originalPrice: 150, description: "门票+游船套餐", validDays: 1, stock: 150 }
      ],
      rating: 4.6,
      reviewCount: 6890,
      openTime: "08:00-17:30",
      phone: "0833-2302296",
      tags: ["世界遗产", "佛教文化", "石刻艺术"]
    },
    {
      id: "spot_015",
      name: "苏州园林",
      address: "江苏省苏州市姑苏区",
      areaName: "姑苏区",
      cityName: "苏州",
      proName: "江苏省",
      summary: "世界文化遗产，中国古典园林的典型代表，以其精致的造园艺术闻名于世。",
      location: { lat: "31.2990", lon: "120.6189" },
      picList: ["https://images.unsplash.com/photo-1574067358754-ac4b4e7d0c18?w=400&h=200&fit=crop"],
      tickets: [
        { id: "t015_1", type: "adult", name: "拙政园门票", price: 70, description: "拙政园门票", validDays: 1, stock: 300 },
        { id: "t015_2", type: "combo", name: "四大名园联票", price: 240, originalPrice: 280, description: "拙政园+留园+网师园+环秀山庄", validDays: 2, stock: 100 },
        { id: "t015_3", type: "student", name: "学生票", price: 35, description: "学生优惠票", validDays: 1, stock: 150 }
      ],
      rating: 4.7,
      reviewCount: 10500,
      openTime: "08:00-17:00",
      phone: "0512-67510286",
      tags: ["古典园林", "世界遗产", "江南水乡"]
    },
    {
      id: "spot_016",
      name: "敦煌莫高窟",
      address: "甘肃省敦煌市东南25公里",
      areaName: "敦煌市",
      cityName: "酒泉",
      proName: "甘肃省",
      summary: "世界文化遗产，中国古代艺术宝库，以其精美的壁画和彩塑闻名于世。",
      location: { lat: "40.0395", lon: "94.8032" },
      picList: ["https://images.unsplash.com/photo-1574067358754-ac4b4e7d0c18?w=400&h=200&fit=crop"],
      tickets: [
        { id: "t016_1", type: "adult", name: "A类门票", price: 238, description: "A类参观门票（含8个洞窟）", validDays: 1, stock: 200 },
        { id: "t016_2", type: "emergency", name: "应急参观票", price: 100, description: "应急参观票（含4个洞窟）", validDays: 1, stock: 100 },
        { id: "t016_3", type: "digital", name: "数字展示中心", price: 50, description: "数字展示中心门票", validDays: 1, stock: 300 }
      ],
      rating: 4.9,
      reviewCount: 5420,
      openTime: "08:00-17:30",
      phone: "0937-8825000",
      tags: ["世界遗产", "佛教艺术", "丝绸之路"]
    },
    {
      id: "spot_017",
      name: "兵马俑",
      address: "陕西省西安市临潼区",
      areaName: "临潼区",
      cityName: "西安",
      proName: "陕西省",
      summary: "世界文化遗产，秦始皇陵的陪葬坑，被誉为'世界第八大奇迹'。",
      location: { lat: "34.3848", lon: "109.2787" },
      picList: ["https://images.unsplash.com/photo-1574067358754-ac4b4e7d0c18?w=400&h=200&fit=crop"],
      tickets: [
        { id: "t017_1", type: "adult", name: "成人门票", price: 120, description: "兵马俑博物馆门票", validDays: 1, stock: 800 },
        { id: "t017_2", type: "student", name: "学生票", price: 60, description: "学生优惠票", validDays: 1, stock: 200 },
        { id: "t017_3", type: "combo", name: "兵马俑+华清池", price: 180, originalPrice: 220, description: "兵马俑+华清池联票", validDays: 2, stock: 150 }
      ],
      rating: 4.8,
      reviewCount: 18700,
      openTime: "08:30-17:00",
      phone: "029-81399001",
      tags: ["世界遗产", "历史文化", "考古发现"]
    },
    {
      id: "spot_018",
      name: "峨眉山",
      address: "四川省乐山市峨眉山市",
      areaName: "峨眉山市",
      cityName: "乐山",
      proName: "四川省",
      summary: "中国四大佛教名山之一，世界文化和自然双重遗产，以其秀美的自然风光和深厚的佛教文化著称。",
      location: { lat: "29.6016", lon: "103.4842" },
      picList: ["https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=200&fit=crop"],
      tickets: [
        { id: "t018_1", type: "adult", name: "成人门票", price: 185, description: "峨眉山景区门票", validDays: 1, stock: 600 },
        { id: "t018_2", type: "cable", name: "金顶索道", price: 120, description: "金顶索道往返票", validDays: 1, stock: 300 },
        { id: "t018_3", type: "combo", name: "门票+索道", price: 260, originalPrice: 305, description: "门票+金顶索道套餐", validDays: 1, stock: 200 }
      ],
      rating: 4.7,
      reviewCount: 11800,
      openTime: "06:00-17:00",
      phone: "0833-5533355",
      tags: ["佛教名山", "世界遗产", "自然风光"]
    },
    {
      id: "spot_019",
      name: "武当山",
      address: "湖北省十堰市武当山特区",
      areaName: "武当山特区",
      cityName: "十堰",
      proName: "湖北省",
      summary: "中国道教圣地，世界文化遗产，以其宏伟的古建筑群和深厚的道教文化而闻名。",
      location: { lat: "32.4085", lon: "111.0046" },
      picList: ["https://images.unsplash.com/photo-1574067358754-ac4b4e7d0c18?w=400&h=200&fit=crop"],
      tickets: [
        { id: "t019_1", type: "adult", name: "成人门票", price: 243, description: "武当山景区门票", validDays: 1, stock: 400 },
        { id: "t019_2", type: "cable", name: "索道往返", price: 170, description: "琼台索道往返票", validDays: 1, stock: 200 },
        { id: "t019_3", type: "student", name: "学生票", price: 163, description: "学生优惠票", validDays: 1, stock: 150 }
      ],
      rating: 4.6,
      reviewCount: 7650,
      openTime: "08:00-17:00",
      phone: "0719-5665396",
      tags: ["道教文化", "世界遗产", "古建筑群"]
    },
    {
      id: "spot_020",
      name: "青海湖",
      address: "青海省海南藏族自治州共和县",
      areaName: "共和县",
      cityName: "海南州",
      proName: "青海省",
      summary: "中国最大的内陆咸水湖，被誉为'中国最美的湖泊'，以其壮美的自然风光和独特的高原景观著称。",
      location: { lat: "36.9569", lon: "100.1594" },
      picList: ["https://images.unsplash.com/photo-1574067358754-ac4b4e7d0c18?w=400&h=200&fit=crop"],
      tickets: [
        { id: "t020_1", type: "adult", name: "青海湖门票", price: 50, description: "青海湖景区门票", validDays: 1, stock: 500 },
        { id: "t020_2", type: "combo", name: "环湖一日游", price: 280, description: "青海湖环湖一日游", validDays: 1, stock: 100 },
        { id: "t020_3", type: "photo", name: "油菜花观赏", price: 30, description: "油菜花海观赏区", validDays: 1, stock: 200 }
      ],
      rating: 4.8,
      reviewCount: 6750,
      openTime: "全天开放",
      phone: "0974-8518888",
      tags: ["高原湖泊", "自然风光", "油菜花海"]
    }
  ]

  // 获取所有景点
  async getAllSpots(params: SpotSearchParams = {}): Promise<SpotItem[]> {
    const { keyword, cityName, proName, page = 1, pageSize = 20 } = params
    let filteredSpots = this.mockSpots

    // 关键词搜索
    if (keyword) {
      filteredSpots = filteredSpots.filter(spot => 
        spot.name.includes(keyword) || 
        spot.summary.includes(keyword) ||
        spot.tags.some(tag => tag.includes(keyword))
      )
    }

    // 城市筛选
    if (cityName) {
      filteredSpots = filteredSpots.filter(spot => spot.cityName.includes(cityName))
    }

    // 省份筛选
    if (proName) {
      filteredSpots = filteredSpots.filter(spot => spot.proName.includes(proName))
    }

    // 分页
    const startIndex = (page - 1) * pageSize
    const endIndex = startIndex + pageSize
    
    return filteredSpots.slice(startIndex, endIndex)
  }

  // 根据ID获取景点详情
  async getSpotById(id: string): Promise<SpotItem | null> {
    return this.mockSpots.find(spot => spot.id === id) || null
  }

  // 获取热门景点
  async getPopularSpots(limit: number = 8): Promise<SpotItem[]> {
    return this.mockSpots
      .sort((a, b) => b.reviewCount - a.reviewCount)
      .slice(0, limit)
  }

  // 搜索景点
  async searchSpots(keyword: string, page: number = 1, pageSize: number = 20): Promise<SpotItem[]> {
    return this.getAllSpots({ keyword, page, pageSize })
  }

  // 将景点数据转换为Destination格式
  convertSpotToDestination(spot: SpotItem): Destination & { 
    address: string
    summary: string
    location: SpotLocation 
    tickets: SpotTicket[]
  } {
    return {
      id: spot.id,
      name: spot.name,
      country: `${spot.cityName}, ${spot.proName}`,
      price: spot.tickets.length > 0 ? `From ¥${Math.min(...spot.tickets.map(t => t.price))}` : 'Free',
      image: spot.picList[0] || 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=200&fit=crop',
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      rating: spot.rating,
      reviewCount: spot.reviewCount,
      popularityRank: 1,
      tags: spot.tags,
      address: spot.address,
      summary: spot.summary,
      location: spot.location,
      tickets: spot.tickets
    }
  }
}

export const spotService = new SpotService()
export default SpotService
