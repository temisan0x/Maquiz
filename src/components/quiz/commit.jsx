import React from 'react'
import PropTypes from 'prop-types'

const commit = props => {
    return (
        <div>
            git remote add origin https://github.com/heytemisan/Maquiz.git
            git branch -M main
        </div>
    )
}

commit.propTypes = {

}

export default commit
