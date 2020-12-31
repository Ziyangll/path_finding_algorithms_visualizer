import React, {useState, useEffect} from 'react'


export default function Board(props: {width: number, height: number, start_x: number, start_y: number, end_x: number, end_y: number}) {
    const [found_end, set_found_end] = useState(false);
    const [time, setTime] = useState(0);
    useEffect(() => {
    const interval = setInterval(() => setTime(time+1), 1000);
    return () => {
        clearInterval(interval);
    };
    }, [time]);

    let width = props.width;
    let height = props.height;
    let start_x = props.start_x;
    let start_y = props.start_y;
    let end_x = props.end_x;
    let end_y = props.end_y;

    let new_board: string[][] = [];
    for(let i=0; i < height; i++) {
        let row = []
        for(let j = 0; j < width; j++) {
            if (i === start_x && j === start_y) {
                row.push('S')
            }
            else if (i === end_x && j === end_y) {
                row.push('E')
            }
            else {
                row.push('O')
            }
        }
        new_board.push(row)
    };
    const [board, setBoard] = useState(new_board);

    useEffect(() => {
    const interval = setInterval(() => setBoard(next_board(board, width, height, found_end, set_found_end)), 1000);
    return () => {
        clearInterval(interval);
    };
    }, [board, width, height, found_end, set_found_end]);

    return (
        <div>
            {found_end && <h3>Found!</h3>}
            <table>
            {board.map((x,i) => {
                return <tr key={i}>
                    {x.map((v,j) => {
                        if (v === 'O') {
                            return <th key={i.toString() + j.toString()}>{v}</th>
                        }
                        else if (v === 'S') {
                            return <th style={{color: "#11698e"}} key={i.toString() + ' ' + j.toString()}>{v}</th>
                        }
                        else if (v === 'E') {
                            return <th style={{color: "#ef4f4f"}} key={i.toString() + ' ' + j.toString()}>{v}</th>
                        }
                        else if (v === "V") {
                            return <th style={{color: "#e6e6e6"}} key={i.toString() + ' ' + j.toString()}>{v}</th>
                        }
                        else {
                            return <th key={i.toString() + ' ' + j.toString()}>{v}</th>
                        }
                    })}
                </tr>
            })}
            </table>
            <p>{time}</p>
        </div>
    )
}

function next_board(board: string[][], width: number, height: number, found_end: boolean, set_found_end: Function) {
    if (!found_end) {
    let next_board = board;
    for(let i=0; i < height; i++) {
        for(let j = 0; j < width; j++) {

            if (next_board[i][j] === 'S') {
                if (i > 0 && next_board[i-1][j] === 'O') {
                    next_board[i-1][j] = 'N'
                }
                if (i < height - 1 && next_board[i+1][j] === 'O') {
                    next_board[i+1][j] = 'N'
                }
                if (j > 0 && next_board[i][j-1] === 'O') {
                    next_board[i][j-1] = 'N'
                }
                if (j < width - 1 && next_board[i][j+1] === 'O') {
                    next_board[i][j+1] = 'N'
                }

                if (i > 0 && next_board[i-1][j] === 'E') {
                    set_found_end(true)
                }
                else if (i < height - 1 && next_board[i+1][j] === 'E') {
                    set_found_end(true)
                }
                else if (j > 0 && next_board[i][j-1] === 'E') {
                    set_found_end(true)
                }
                else if (j < width - 1 && next_board[i][j+1] === 'E') {
                    set_found_end(true)
                }
            }
        }
    };
    for(let i=0; i < height; i++) {
        for(let j = 0; j < width; j++) {
            if (next_board[i][j] === 'N') {
                    next_board[i][j] = 'S'
            }
        }
    };
    return next_board;
    }
    return board;
}