import React from 'react'


export default function Board() {
    let width: number = 30;
    let height: number = 10;
    let board = [];
    for(let i=0; i < height; i++) {
        let row = []
        for(let j = 0; j < width; j++) {
            row.push('O')
        }
        board.push(row)
    };
    return (
        <div>
            {board.map((x,i) => {
                return <p key={i}>{x}</p>
            })}
        </div>
    )
}