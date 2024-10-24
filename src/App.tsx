import Counter from "./components/Counter";
import TempConv from "./components/TempConv";
import FlightBooker from "./components/FlightBooker";
import Timer from "./components/Timer";
import Crud from "./components/Crud";
import CircleDraw from "./components/CircleDraw";
import Cells from "./components/Cells";

function App() {
  return (
    <div className="app">
      <header>
        <h1 className="page-title">7GUIs Tasks</h1>
      </header>
      <hr className="hr" />
      <main>
        <p>
          7GUIs is a set of small GUI programming tasks intended to test the
          capabilities of a GUI framework, see{" "}
          <a href="https://eugenkiss.github.io/6guis/tasks">7GUIs</a>. This
          webpage is my attempt to do these seven tasks using React.
        </p>
        <article>
          <h2>Counter</h2>
          <p>
            A simple button that increments a count whenever it&apos;s pressed.
          </p>
          <Counter />
        </article>
        <article>
          <h2>Temperature Converter</h2>
          <p>
            A bi-directional converter between Celcius and Farenheight that
            updates as the user types.
          </p>
          <TempConv />
        </article>
        <article>
          <h2>Flight Booker</h2>
          <p>A form to book flight dates with some basic validation.</p>
          <FlightBooker />
        </article>
        <article>
          <h2>Timer</h2>
          <p>
            A progress bar whose duration can be updated without resetting it.
          </p>
          <Timer />
        </article>
        <article>
          <h2>CRUD</h2>
          <p>A database of names which supports searching and modification.</p>
          <Crud />
        </article>
        <article className="circle-drawer">
          <h2>Circle Drawer</h2>
          <h3>Paint with circles!</h3>
          <ul>
            <li>Click on an empty space to create a circle.</li>
            <li>Click on an existing circle to select it.</li>
            <li>
              Use the slider and colour picker to make the circles{" "}
              <em>fancy</em>.
            </li>
            <li>Use the buttons to undo or redo your art.</li>
          </ul>
          <CircleDraw />
        </article>
        <article>
          <h2>Cells</h2>
          <p>
            A spreadsheet that supports entry of string and numbers, and
            summation of numbers.
          </p>
          <p>
            Write <code>=</code> in a box to have its value be calculated as the
            sum of the values in the two cells above and to the left.
          </p>
          <Cells />
        </article>
      </main>
    </div>
  );
}

export default App;
