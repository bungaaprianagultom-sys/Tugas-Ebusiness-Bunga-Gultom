import React, {useState} from 'react'

function Tambah() {
    const [count, iscount] = useState(0)
  return (
    <div>
      <h1> Tambah Kurang</h1>
      <p> Nilai Sekarang : {count} </p>
      <button onClick={() => iscount (count +1)}> TAMBAH </button>
      <button onClick={() => iscount (count -1)} disabled = {count <= 0}> KURANG </button>
    </div>
  )
}

export default Tambah
