export default {
  items: [
    {
      name: 'Daily Scrum',
      url: '/scrum',
      icon: 'icon-puzzle',
      badge: {
        variant: 'info'
      }
    }, {
      name: '5:30 Status',
      url: '/eod-status',
      icon: 'fa fa-comments-o fa-lg mt-2',
      badge: {
        variant: 'info'
      }
    }, 
    
    {
      name: 'Status History',
      url: '/status',
      icon: 'fa fa-history fa-lg mt-2',
      children: [
        {
          name: 'Today',
          url: '/daily-status',
          icon: 'fa fa-calendar-o fa-lg mt-2',
          badge: {
            variant: 'info'
          }
        },
        {
          name: 'This Week',
          url: '/weekly-status',
          icon: 'fa fa-calendar fa-lg mt-2',
          badge: {
            variant: 'info'
          }
        }, 
      ]
    },
    {
      name: 'Folow up',
      url: '/follow-up',
      icon: 'icon-puzzle',
      badge: {
        variant: 'info'
      }
    }, 
  ]
};
