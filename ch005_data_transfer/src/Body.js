import React from 'react';

export default props => {
    return <article>
        {JSON.stringify(props.data)}
    </article>;
}