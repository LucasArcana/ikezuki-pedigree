import './App.css'
import Pedigree from './Pedigree.jsx'

export default function App() {
  return (
    <>
      <div>
          <h1>Ikezuki</h1>
      </div>
      <div className="navbtn">
          <button>Pedigree</button>
          <button>About</button>
      </div>
      <section>
        <div>
          <Pedigree />
        </div>
      </section>
    </>
  )
}

