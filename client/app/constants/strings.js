export default {
  populars : 'Top 50',
  recents: '最新的',
  videoFavorited: '喜欢的视频',
  videoCollected: '收藏的视频', 
  notes: '笔记本',
  words: '单词本',
  history: '历史记录',

  logout: '退出登录',
  page404: '失路之人，何不另择良页而访之？',
  searchInput: '搜索',
  noVideos: '没有任何视频',

  getLevel: (level) => {
    switch(level) {
      case 'beginner' : return '初级';
      case 'intermediate' : return '中级';
      case 'advanced': return '高级';
    }
  },
  zh: '中文',
  notation: '注释',
  loop: '单句重复',
}