var addBtn = document.querySelector('#add');

const addHandler = async (event) => {
    event.preventDefault();    
  console.log(event);
  console.log("Add handler");
  const id = addBtn.getAttribute('data-ID');
  console.log(id);
    if (id) {
      const response = await fetch('/add', {
        method: 'POST',
        body: JSON.stringify({ id }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        alert('Book added to your reading list.');
      } else {
        alert('Failed to add to reading list.');
      }
    }
  };


  addBtn.addEventListener('click', addHandler);