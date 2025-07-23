import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import styles from './SearchBar.module.css';

export default function SearchBar({ onSubmit }) {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmedValue = inputValue.trim();

    if (trimmedValue === '') {
      toast.error('Please enter a search term!');
      return;
    }

    onSubmit(trimmedValue);
    setInputValue('');
  };

  return (
    <header>
      <Toaster position="top-right" />
      <form onSubmit={handleSubmit}>
        <input
          className={styles.input}
          type="text"
          value={inputValue}
          onChange={handleChange}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
        <button type="submit">Search</button>
      </form>
    </header>
  );
}