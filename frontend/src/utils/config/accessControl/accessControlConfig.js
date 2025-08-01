const homepage = {
    id: 1,
    title: '首頁資訊',
    content: [
        {title: '首頁', options: [{text: '可見', value: 1}]},
        {title: '最新消息', options: [{text: '可見', value: 2}]},
        {title: '線傳考核', options: [{text: '可見', value: 3}]},
        {title: '決策報表', options: [{text: '可見', value: 4}]},
    ],
};

const mobilization = {
    id: 2,
    title: '動員量能',
    content: [
        {title: '儀表板', options: [{text: '可見', value: 5}]},
        {title: '報表查詢', options: [{text: '可見', value: 6}]},
    ],
};

const businessManagement = {
    id: 3,
    title: '業務管考',
    content: [
        {
            title: '重要政策',
            options: [
                {text: '可見', value: 7},
                {text: '新增', value: 8},
                {text: '修改', value: 9},
                {text: '刪除', value: 10},
            ],
        },
        {
            title: '跨部會定期會議管理',
            options: [
                {text: '可見', value: 11},
                {text: '新增', value: 12},
                {text: '修改', value: 13},
                {text: '刪除', value: 14},
            ],
        },
        {
            title: '動員方案審議管理',
            options: [
                {text: '可見', value: 15},
                {text: '新增', value: 16},
                {text: '修改', value: 17},
                {text: '刪除', value: 18},
            ],
        },
        {
            title: '動員分類計畫審議管理',
            options: [
                {text: '可見', value: 19},
                {text: '新增', value: 20},
                {text: '修改', value: 21},
                {text: '刪除', value: 22},
            ],
        },
        {
            title: '動員業務訪問管理',
            options: [
                {text: '可見', value: 23},
                {text: '新增', value: 24},
                {text: '修改', value: 25},
                {text: '刪除', value: 26},
            ],
        },
        {
            title: '動員業務訪評管理',
            options: [
                {text: '可見', value: 27},
                {text: '新增', value: 28},
                {text: '修改', value: 29},
                {text: '刪除', value: 30},
            ],
        },
        {
            title: '演習驗證評鑑管理',
            options: [
                {text: '可見', value: 31},
                {text: '新增', value: 32},
                {text: '修改', value: 33},
                {text: '刪除', value: 34},
            ],
        },
        {
            title: '動員講習培訓',
            options: [
                {text: '可見', value: 35},
                {text: '新增', value: 36},
                {text: '修改', value: 37},
                {text: '刪除', value: 38},
            ],
        },
        {
            title: '動員績優表揚',
            options: [
                {text: '可見', value: 39},
                {text: '新增', value: 40},
                {text: '修改', value: 41},
                {text: '刪除', value: 42},
            ],
        },
        {
            title: '動員會報',
            options: [
                {text: '可見', value: 43},
                {text: '新增', value: 44},
                {text: '修改', value: 45},
                {text: '刪除', value: 46},
            ],
        },
        {
            title: '戰綜會報',
            options: [
                {text: '可見', value: 47},
                {text: '新增', value: 48},
                {text: '修改', value: 49},
                {text: '刪除', value: 50},
            ],
        },
        {
            title: '合署成效',
            options: [
                {text: '可見', value: 106},
            ],
        },
    ],
};

const retrievalService = {
    id: 4,
    title: '檢索服務',
    content: [
        {
            title: '動員體系法規查詢',
            options: [{text: '可見', value: 51}],
        },
        {
            title: '動員體系法規管理',
            options: [
                {text: '可見', value: 52},
                {text: '新增', value: 53},
                {text: '修改', value: 54},
                // TODO: only for development
                {text: '廢止', value: 55},
                {text: '刪除', value: 56},
            ],
        },
        {
            title: '動員計畫下載查詢',
            options: [{text: '可見', value: 57}],
        },
        {
            title: '動員計畫下載管理',
            options: [
                {text: '可見', value: 58},
                {text: '新增', value: 59},
                {text: '修改', value: 60},
                {text: '刪除', value: 61},
            ],
        },
        {
            title: '動員機關聯絡資訊',
            options: [{text: '可見', value: 62}],
        },
    ],
};

const dataSearch = {
    id: 5,
    title: '資料查詢',
    content: [
        {
            title: '資料態樣',
            options: [
                {text: '可見', value: 63},
                {text: '確認', value: 64},
                // TODO: only for development
                // { text: '清冊匯出', value: [] },
            ],
        },
        {
            title: '雲端資料編輯',
            options: [
                {text: '可見', value: 103},
                {text: '編輯', value: 104},
            ],
        },
        {
            title: '雲端資料查詢',
            options: [
                {text: '可見', value: 105},
            ],
        },
    ],
};

const systemManagement = {
    id: 6,
    title: '系統管理',
    content: [
        {
            title: '使用者管理',
            options: [
                {text: '可見', value: 65},
                {text: '新增', value: 66},
                {text: '修改', value: 67},
                {text: '管理', value: 68},
                {text: '備考', value: 69},
            ],
        },
        {
            title: '線上帳號審核',
            options: [
                {text: '可見', value: 70},
                {text: '審核', value: 71},
            ],
        },
        {
            title: '角色權限管理',
            options: [
                {text: '可見', value: 72},
                {text: '新增', value: 73},
                {text: '修改', value: 74},
                {text: '刪除', value: 75},
            ],
        },
        {
            title: '編管類別管理',
            options: [
                {text: '可見', value: 76},
                {text: '新增', value: 77},
                {text: '修改', value: 78},
                {text: '刪除', value: 79},
            ],
        },
        {
            title: '中央機關管理',
            options: [
                {text: '可見', value: 80},
                {text: '新增', value: 81},
                {text: '修改', value: 82},
                {text: '刪除', value: 83},
            ],
        },
        {
            title: '系統代碼管理',
            options: [
                {text: '可見', value: 84},
                {text: '新增', value: 85},
                {text: '修改', value: 86},
                {text: '刪除', value: 87},
            ],
        },
        {
            title: '系統選單管理',
            options: [
                {text: '可見', value: 88},
                {text: '新增', value: 89},
                {text: '修改', value: 90},
                {text: '刪除', value: 91},
            ],
        },
        {
            title: '系統操作紀錄',
            options: [{text: '可見', value: 92}],
        },
        {
            title: '系統公告維護',
            options: [
                {text: '可見', value: 93},
                {text: '新增', value: 94},
                {text: '修改', value: 95},
                {text: '刪除', value: 96},
            ],
        },
        {
            title: '明碼權限申請',
            options: [
                {text: '可見', value: 97},
                {text: '新增', value: 98},
                {text: '刪除', value: 99},
            ]
        },
        {
            title: '明碼權限審核',
            options: [
                {text: '可見', value: 101},
                {text: '審核', value: 102}
            ]
        }
    ],
};

export const defaultPermissionGroup = 97;

export default [
    homepage,
    mobilization,
    businessManagement,
    retrievalService,
    dataSearch,
    systemManagement,
];
