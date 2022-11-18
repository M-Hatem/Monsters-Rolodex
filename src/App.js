import { useEffect, useState } from "react";

import CardList from "./components/card-list/card-list.component";
import SearchBox from "./components/search-box/search-box.component";

import "./App.css";

const App = () => {
  const [search, setSearch] = useState("");
  const [monsters, setMonsters] = useState([]);
  const [filteredMonsters, setFilteredMonsters] = useState(monsters);

  console.log("rendered");
  // To get Monsters
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((users) => setMonsters(users));
  }, []);

  // To get filtered monsters
  useEffect(() => {
    const newFilteredMonsters = monsters.filter((monster) =>
      monster.name.toLocaleLowerCase().includes(search)
    );
    setFilteredMonsters(newFilteredMonsters);
  }, [monsters, search]);

  const onSearch = (e) => {
    const searchValue = e.target.value.toLocaleLowerCase();
    setSearch(searchValue);
  };

  return (
    <div className="App">
      <h1 className="app-title">Monsters Rolobox</h1>
      <SearchBox
        className="search-box"
        placeholder="Search Monsters"
        onChangeHandler={onSearch}
      />
      <CardList monsters={filteredMonsters} />
    </div>
  );
};

// class App extends Component {
//   constructor() {
//     super();

//     this.state = {
//       monsters: [],
//       searchValue: "",
//     };
//   }

//   componentDidMount() {
//     fetch("https://jsonplaceholder.typicode.com/users")
//       .then((response) => response.json())
//       .then(
//         (users) =>
//           this.setState(() => {
//             return { monsters: users };
//           }),
//         () => console.log(this.state)
//       );
//   }

//   onSearch = (e) => {
//     const searchValue = e.target.value.toLocaleLowerCase();
//     this.setState({ searchValue });
//   };

//   render() {
//     const { monsters, searchValue } = this.state;
//     const { onSearch } = this;

//     const filteredMonsters = monsters.filter((monster) =>
//       monster.name.toLocaleLowerCase().includes(searchValue)
//     );

//     return (
//       <div className="App">
//         <h1 className="app-title">Monsters Rolobox</h1>
//         <SearchBox
//           className="search-box"
//           placeholder="Search Monsters"
//           onChangeHandler={onSearch}
//         />
//         <CardList monsters={filteredMonsters} />
//       </div>
//     );
//   }
// }

export default App;
