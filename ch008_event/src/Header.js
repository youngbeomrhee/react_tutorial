import React from 'react';

export default props => {
    return (
        <>
            <h3>득표수</h3>
            {
                props.votes && props.votes.length > 0 ? (
                    <>
                        <ul>
                            {
                                props.votes.map((vote, i)=>
                                    <li key={i}>{vote.title} | {vote.voted} 표 획득</li>
                                )
                            }
                        </ul>
                    </>
                ) : (
                    <h4>후보가 등록되지 않았습니다.</h4>
                )
            }
        </>
    );
}