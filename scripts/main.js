$(() => {

  const $countries = $('.countries')
  const $regionSelect = $('#region')

  let countries = []
  let region = ''

  $regionSelect.on('change', (e) => {
    region = $(e.target).val()
    displayCountries()
  })

  function getAllCountries() {
    if (region !== 'All') {
      $.ajax({
        method: 'GET',
        url: `https://restcountries.eu/rest/v2/${region}`
      })

        .then(response => {
          countries = response
          displayCountries()
        })
    } else if (region === 'All') {
      $.ajax({
        method: 'GET',
        url: 'https://restcountries.eu/rest/v2/all'
      })

        .then(response => {
          countries = response
          displayCountries()
        })
    }
  }

  function filteredCountries() {
    const re = new RegExp(region)
    const filtered = countries.filter(country => {
      return re.test(country.region)
    })
    return filtered
  }

  function displayCountries() {
    console.log(region)
    $countries.empty()
    filteredCountries().forEach(country => {
      $countries.append(`
      <div>
      <h4>${country.name}</h4>
      <h6>${country.nativeName}<h6>
      <img src=${country.flag} alt=${country.name} />
      `)
    })
  }
  getAllCountries()

})
