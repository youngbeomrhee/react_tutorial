import React from 'react';

export default props => {
    return <article>
        <h3>후보</h3>
        <ul>
            {
                props.data && props.data.movies && props.data.movies.length > 0 ? props.data.movies.map(movie => (
                    <li>
                        {movie.title}
                    </li>
                )) : (
                    <li>데이터가 없습니다.</li>
                )
            }
        </ul>
    </article>;
}