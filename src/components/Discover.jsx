import React, { useState, useEffect } from "react"
import axios from "axios"
import "./App.css"
import Select from "react-select";
import Checkbox from "./CheckboxBtn.jsx"
import Card from "./Card"

function Discover(props) {

  const [yearOptions, setYearOptions] = useState([])
  const [sortByOptions, setSortByOptions] = useState([])
  const [year, setYear] = useState({})
  const [sortBy, setSortBy] = useState("")
  const [movies, setMovies] = useState([])
  const [genres, setGenres] = useState([])
  const [checked, setChecked] = useState("")
  const [checkedArray, setCheckedArray] = useState([])
  const [loading, setLoading] = useState(true)
  const apiKey = "6a97c9dac8bbcd1375f356915f8fb53b"


  useEffect(() => { lengthOfTheArray() }, [])
  useEffect(() => { sortByOptionsDisplay() }, [])
  useEffect(() => { handleSelect() }, [checked, year, sortBy])

  const handleSelect = async () => {

    let query

    try {
      if (checked != "" || Object.entries(year).length !== 0 || sortBy != "") {

        if (checked != "" && Object.entries(year).length !== 0 && sortBy != "") {

          query = `&primary_release_year=${year.id}&with_genres=${checked}&sort_by=${sortBy.value}`

        } else if (checked != "" && Object.entries(year).length !== 0) {

          query = `&primary_release_year=${year.id}&with_genres=${checked}`

        } else if (checked != "" && sortBy != "") {

          query = `&with_genres=${checked}&sort_by=${sortBy.value}`

        } else if (Object.entries(year).length !== 0 && sortBy != "") {

          query = `&primary_release_year=${year.id}&sort_by=${sortBy.value}`

        } else if (checked != "") {

          query = `&with_genres=${checked}`

        } else if (Object.entries(year).length !== 0) {

          query = `&primary_release_year=${year.id}`

        } else if (sortBy != "") {

          query = `&sort_by=${sortBy.value}`

        }

        const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey + query}`
        const response = await axios.get(url);
        setMovies(response.data.results.slice(0, 12))
        setLoading(false)
      }
    } catch (e) {
      console.log(e)
    }
  }

  const handleSelectYear = async (selected) => {
    setYear(selected);
  }

  const handleSortBy = async (selected) => {
    setSortBy(selected);
  }

  const sortByOptionsDisplay = async () => {
    const sortByDisplay = []

    sortByDisplay.push(
      {
        label: "Release date ascending",
        id: 0,
        value: "release_date.asc"
      },
      {
        label: "Release date descending",
        id: 1,
        value: "release_date.desc"
      },
      {
        label: "Title (A-Z)",
        id: 2,
        value: "original_title.asc"
      },
      {
        label: "Title (Z-A)",
        id: 3,
        value: "original_title.desc"
      },
      {
        label: "Rating Ascending",
        id: 4,
        value: "vote_average.asc"
      },
      {
        label: "Rating Descending",
        id: 5,
        value: "vote_average.desc"
      }
    )
    setSortByOptions(sortByDisplay)
  }

  const lengthOfTheArray = async () => {
    const years = []
    let now = new Date()
    now = now.getFullYear()

    years.push({
      label: "None",
      id: ""
    })

    for (var i = now; i >= 1920; i--) {
      years.push({
        label: i,
        id: i
      })
    }
    setYearOptions(years)
  }

  function getFavorites(favorites) {
    props.getValue(favorites)
  }

  function getChecked(array) {
    let tempChecked = ""
    let tempCheckedArray = []

    array.forEach((box, index) => {
      if (box) {
        if (tempChecked == "") {
          tempChecked = genres[index]
        }
        else {
          tempChecked = tempChecked + "," + genres[index]
        }
        tempCheckedArray.push(genres[index])
      }
    })
    setChecked(tempChecked)
    console.log(tempCheckedArray)
    setCheckedArray(tempCheckedArray)
  }

  function getIds(Ids) {
    setGenres(Ids)
  }

  return (
    <div className="main-container black">
      <div className="discover-main-menu">
        <Checkbox getChecked={getChecked} getIds={getIds} />
        <div className="discover-menu">
          <div className="years">
            <p className="label">Year</p>
            <Select onChange={handleSelectYear} options={yearOptions} />
          </div>
          <div className="sort-by">
            <p className="label">Sort</p>
            <Select onChange={handleSortBy} options={sortByOptions} />
          </div>
        </div>
      </div>
      {loading ? (<h2 className="text-center">Please Select an Option</h2>)
        :
        (
          (movies.length !== 0) ? <Card cards={movies} getValue={getFavorites} />
            :
            (<h2 className="text-center">No results found</h2>)
        )
      }
    </div>
  )
}

export default Discover;