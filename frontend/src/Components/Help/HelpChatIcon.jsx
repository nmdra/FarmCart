import { useEffect } from 'react'
import PropTypes from 'prop-types'
import Intercom from '@intercom/messenger-js-sdk'

export default function HelpChatIcon({ user }) {
    useEffect(() => {
        if (user && user.id && user.name && user.email && user.createdAt) {
            Intercom({
                app_id: 'k00hovd0',
                user_id: user.id,
                name: user.name,
                email: user.email,
                created_at: Math.floor(
                    new Date(user.createdAt).getTime() / 1000
                ), // Convert to Unix timestamp in seconds
            })
        }
    }, [user])

    return <div></div>
}

// Add propTypes validation
HelpChatIcon.propTypes = {
    user: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        createdAt: PropTypes.string.isRequired,
    }).isRequired,
}
