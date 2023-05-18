import { Hero2, Popular } from "@/components/LandingPage";
import axios from "axios";
import { useEffect, useRef, useState } from "react";



export default function Home() {
  const baseURL = 'http://127.0.0.1:8000/'

  const [data, setData] = useState("");
  const api = async () => {
    try {

      const res = await axios.post(`${baseURL}api/travel/`, {});
      setData(res.choices[0].message.content)
      console.log(data);
    } catch (error) {
      setData("error")
    }

  }
  // useEffect(() => {
  //   api()
  // }, [])
  const [search, setSearch] = useState('');
  const [open, setOpen] = useState(false);
  const items = ['Bitcoin', 'Ethereum', 'Siacoin'];

  function handleSearch(event) {
    setSearch(event.target.value);
  }

  function toggleDropdown() {
    setOpen(!open);
  }

  function handleItemClick(item) {
    setSearch(item);
    setOpen(false);
  }

  const filteredItems = items.filter(
    (item) => item.toLowerCase().startsWith(search.toLowerCase())
  );
  const dropdownRef = useRef(null);
  function handleClickOutside(event) {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setOpen(false);
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      {/* <Hero /> */}
      <Hero2 />
      <Popular />
     


    </>
  )
}
