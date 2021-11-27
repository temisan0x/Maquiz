import React from 'react'
import PropTypes from 'prop-types'

const commit = props => {
    return (
        <div>
            git remote add origin https://github.com/heytemisan/Maquiz.git
            git branch -M main
            git push -u origin main
            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
        </div>
    )
}

commit.propTypes = {

}

export default commit
