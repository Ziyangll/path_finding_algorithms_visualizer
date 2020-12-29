import React, {useState, useEffect} from 'react'


export default function Board(props: {width: number, height: number, start_x: number, start_y: number, end_x: number, end_y: number}) {

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

    let board = [];
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
        board.push(row)
    };
    return (
        <div>

            <table>
            {board.map((x,i) => {
                return <tr key={i}>
                    {x.map((v,j) => {
                        if (v === 'O') {
                            return <th key={i.toString() + j.toString()}>{v}</th>
                        }
                        else if (v === 'S') {
                            return <th style={{color: "#ef4f4f"}} key={i.toString() + ' ' + j.toString()}>{v}</th>
                        }
                        else if (v === 'E') {
                            return <th style={{color: "#11698e"}} key={i.toString() + ' ' + j.toString()}>{v}</th>
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
