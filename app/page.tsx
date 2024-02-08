"use client"
// @ts-ignore
import * as headbreaker from 'headbreaker';
import { ChangeEventHandler, Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';

function DemoJigsaw(props: { id: string, width: number, height: number, pieceSize: number }) {
  const puzzleRef = useRef(null)


  useEffect(() => {
    const puzzle = puzzleRef.current
    // @ts-ignore
    const canvas = new headbreaker.Canvas(puzzle.id, {
      width: props.width, height: props.height,
      pieceSize: props.pieceSize, proximity: props.pieceSize / 5,
      borderFill: props.pieceSize / 10, strokeWidth: 2, lineSoftness: 0.18,
      painter: new headbreaker.painters.Konva()
    });

    canvas.autogenerate({
      horizontalPiecesCount: 2,
      verticalPiecesCount: 2,
      metadata: [
        { color: '#B83361' },
        { color: '#B87D32' },
        { color: '#A4C234' },
        { color: '#37AB8C' }
      ]
    });

    canvas.draw();
  }, [
    props.height, props.pieceSize, props.width, props.width
  ])

  return <div ref={puzzleRef} id={props.id}></div>
}

export default function Home() {
  const [pieceSize, setPieceSize] = useState(100);
  const [width, setWidth] = useState(600);
  const [height, setHeight] = useState(850);

  function handleClick(f: Dispatch<SetStateAction<number>>) : ChangeEventHandler<HTMLInputElement> {
    return (e) => f(Number(e.target.value))
  }

  return (
    <>
      <main className="">
        <h1>Headbreaker From React</h1>

        <label htmlFor="piece-size">Piece Size</label> <input id="piece-size"  type="number" value={pieceSize} onChange={handleClick(setPieceSize)} />
        <label htmlFor="weight">Width</label> <input id="weight" type="number" value={width} onChange={handleClick(setWidth)} />
        <label htmlFor="height">Height</label> <input id="height" type="number" value={height} onChange={handleClick(setHeight)} />

        <DemoJigsaw id="puzzle" pieceSize={pieceSize} width={width} height={height} />
      </main>
    </>
  )
}