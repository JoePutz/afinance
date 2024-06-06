const actions = [
    {
        name: 'createAdmin',
        displayName: 'Create Admin',
        link: '/user/create',
        icon: 'user-plus',
        forwardState: true,
        state: {
            userType: 'admin'
        }
    },
    {
        name: 'viewMembers',
        displayName: 'Members',
        link: '/member',
        icon: 'users',
        forwardState: false
    },
    {
        name: 'viewUsers',
        displayName: 'Users',
        link: '/user',
        icon: 'users-cog',
        forwardState: false
    },
    {
        name: 'Create Applicant',
        displayName: 'New Applicant',
        link: '/member/create',
        icon: 'user-plus',
        forwardState: false
    },
    {
        name: 'Transaction',
        displayName: 'Post Transaction',
        link: '/transaction/create',
        icon: 'plus',
        forwardState: false
    }
]
export default actions;
