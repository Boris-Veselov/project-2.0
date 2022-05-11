async function signupFormHandler(event) {
    // event.preventDefault();
  
    const username = document.querySelector('#user').value.trim();
    const email = document.querySelector('#email').value.trim();
    const password = document.querySelector('#pass').value.trim();
  
    if (username && email && password) {
      const response = await fetch('/api/users', {
        method: 'post',
        body: JSON.stringify({
          username,
          email,
          password
        }),
        headers: { 'Content-Type': 'application/json' }
      });
  
      // check the response status
      if (response.ok) {
        console.log('success');
      } else {
        alert(response.statusText);
      }
    }
  }

  document.querySelector('#submitbtn').addEventListener('click', signupFormHandler);