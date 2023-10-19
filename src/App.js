import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import './css/bootstrap.main.css';

const URL = 'https://api.quicksell.co/v1/internal/frontend-assignment';

const App = () => {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [response, setResponse] = useState(null);
  const [selectedOption, setSelectedOption] = useState('Status');

  const popupRef = useRef(null);

  useEffect(() => {
    // Add an event listener to listen for clicks on the document
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        // Click occurred outside the popup, close it
        setPopupOpen(false);
      }
    };

    // Attach the event listener
    document.addEventListener('click', handleClickOutside);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const fetchResponse = await fetch(URL);
        const body = await fetchResponse.json();
        setResponse(body);
      } catch (error) {
        console.error('Error:', error);
      }
    }

    fetchData();
  }, []);
  const togglePopup = () => {
    setPopupOpen(!isPopupOpen);
  };

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const filteredData = response?.tickets.filter((ticket) => {
    if (selectedOption === 'Status') {
      return true; // Show all tickets when 'Status' is selected
    }
    return ticket.status === selectedOption;
  });
  return (
    <div>
      <div id="wrapper">
        <div className="content-page">
          <div className="dropdown d-none d-xl-block" ref={popupRef} style={{ backgroundColor: 'white', height: '81px' }}>
            <a
              className="nav-link dropdown-toggle waves-effect waves-light"
              href="#"
              role="button"
              aria-haspopup="false"
              aria-expanded={isPopupOpen ? 'true' : 'false'}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                fontSize: 'small',
                width: '5%',
                left: '1%',
                color: 'rgb(0, 0, 0)',
                borderRadius: '6px',
                boxShadow: '0px 1px 7px rgba(0, 0, 0, 0.25)',
                top: '32px',
                height: '30px',
              }}
              onClick={togglePopup}
            >
              <i className="fa-solid fa-sliders fa-xs" style={{ marginRight: '12px', marginTop: '3px' }}></i>
              Display
            </a>
            {/* {response && (
              <pre>{JSON.stringify(response, null, 2)}</pre>
            )} */}

            <div
              className={`dropdown-menu ${isPopupOpen ? 'show' : ''}`}
              style={{ width: '286px' }}
              onClick={(e) => {
                e.stopPropagation(); // Prevent the click event from propagating
              }}
            >
              <a href="javascript:void(0);" className="dropdown-item" style={{ marginTop: '4%' }}>
                <span>Grouping</span>
                <select
                  value={selectedOption}
                  onChange={handleOptionChange}
                  className="dropdown-item"
                  style={{
                    padding: '0px 3px',
                    border: '1px solid',
                    transform: 'translate(129px, -27px)',
                    background: '#fff',
                    width: '100px',
                    height: '26px',
                    fontWeight: 'bold',
                    borderRadius: '7px',
                    marginTop: '5%',
                  }}
                >
                  <option value="Status">Status</option>
                  <option value="test">test</option>
                  <option value="test">test</option>
                </select>
              </a>

              {/* Display filtered data */}
              <ul>
                {/* {filteredData?.map((ticket) => (
                  <li key={ticket.id}>
                    {ticket.title} - {ticket.status}
                  </li>
                ))} */}
              </ul>
              <a href="javascript:void(0);" className="dropdown-item" style={{ marginTop: '-9%' }}>
                <span>Ordering</span>
                <select
                  defaultValue="Priority"
                  className="dropdown-item"
                  style={{
                    padding: '0px 3px',
                    border: '1px solid',
                    transform: 'translate(129px, -27px)',
                    background: '#fff',
                    width: '100px',
                    height: '26px',
                    fontWeight: 'bold',
                    borderRadius: '7px',
                    marginTop: '2%',
                  }}
                >
                  <option value="Priority">Priority</option>
                  <option value="test">test</option>
                  <option value="test">test</option>
                </select>
              </a>
            </div>
          </div>

          <div className="content" style={{ marginTop: '5%' }}>
            <div className="container-fluid">
              <div className="row">
                <div className="col-lg-4" style={{
                  width: '20%'
                }}>
                  <div className="card-body">
                    <div className="dropdown float-end" style={{ transform: 'rotate(270deg)', left: '-2%' }}>

                    </div>

                    <i className="fa-solid fa-clock fa-xl"></i>
                    <h4 className="header-title" style={{
                      position: 'static',
                      top: '15.8%',
                      fontWeight: 'bold',
                      fontSize: 'x-large',
                      marginLeft: '6%',
                      marginTop: '-4.5%',
                    }}>
                      Not Important
                    </h4>

                    <p className="sub-header">
                    </p>
                    <ul className="sortable-list tasklist list-unstyled" id="upcoming">
                      {filteredData ? (
                        filteredData
                          .filter((ticket) => ticket.status === 'Backlog') // Filter by status
                          .map((ticket) => (
                            <li
                              key={ticket.id}
                              style={{ borderRadius: '9px', backgroundColor: '#ffffff' }}
                            >

                              <h5 className="mt-0">
                                <a href="javascript: void(0);" className="text-dark">
                                  {ticket.id}
                                </a>
                              </h5>
                              <div className="form-check float-end ps-0">
                                <div className="text-end">
                                  {ticket.users && ticket.users.map((user, index) => (
                                    <a href="javascript: void(0);" className="text-muted" key={index}>
                                      <img
                                        src={`assets/images/users/${user}.jpg`}
                                        alt="task-user"
                                        className="avatar-sm img-thumbnail rounded-circle"
                                      />
                                    </a>
                                  ))}
                                </div>
                              </div>
                              <p>
                                {ticket.title}
                              </p>
                              <div className="clearfix"></div>
                              <div className="row">
                                <div className="col">
                                  <p className="font-13 mt-2 mb-0">
                                    <i className="mdi mdi-calendar"></i> {ticket.date}
                                  </p>
                                </div>
                                <div className="col-auto">
                                  <span className="badge bg-soft-danger text-danger float-end" style={{
                                    position: 'absolute';
                                    left: '22%';
                                    width: '15%;'
                                  }}>
                                    {ticket.priority}
                                  </span>
                                </div>
                              </div>
                            </li>
                          ))
                      ) : (
                        <li>Loading...</li>
                      )}
                    </ul>


                  </div>

                </div>
                {/* TODO */}
                <div className="col-lg-4" style={{
                  width: '20%'
                }}>
                  <div className="card-body">
                    <div className="dropdown float-end" style={{ transform: 'rotate(270deg)' }}>
                      <a href="#" className="dropdown-toggle arrow-none" data-bs-toggle="dropdown"
                        aria-expanded="false">
                        <i className="mdi mdi-dots-vertical m-0 text-muted h3"></i>
                      </a>

                    </div>
                    <i className="fa-solid fa-clock fa-xl"></i>
                    <h4 className="header-title" style={{
                      position: 'static',
                      top: '15.8%',
                      fontWeight: 'bold',
                      fontSize: 'x-large',
                      marginLeft: '6%',
                      marginTop: '-4.5%',
                    }}>
                      Todo
                    </h4>
                    <p className="sub-header">
                    </p>

                    <ul className="sortable-list tasklist list-unstyled" id="inprogress">
                      {filteredData ? (
                        filteredData
                          .filter((ticket) => ticket.status === 'Todo') // Filter by status
                          .map((ticket) => (
                            <li
                              key={ticket.id}
                              style={{ borderRadius: '9px', backgroundColor: '#ffffff' }}
                            >
                              <h5 className="mt-0"><a href="javascript: void(0);" className="text-dark">{ticket.id}</a></h5>
                              <div className="form-check float-end ps-0">
                                <div className="text-end">
                                  {ticket.users && ticket.users.map((user, index) => (
                                    <a href="javascript: void(0);" className="text-muted" key={index}>
                                      <img
                                        src={`assets/images/users/${user}.jpg`}
                                        alt="task-user"
                                        className="avatar-sm img-thumbnail rounded-circle"
                                      />
                                    </a>
                                  ))}
                                </div>
                              </div>
                              <p> {ticket.title}</p>
                              <div className="clearfix"></div>
                              <div className="row">
                                <div className="col">
                                  <p className="font-13 mt-2 mb-0"><i className="mdi mdi-calendar"></i> {ticket.date}</p>
                                </div>
                                <div className="col-auto">

                                  <span className=" badge bg-soft-warning text-warning float-end">Medium</span>

                                </div>
                              </div>
                            </li>
                          ))
                      ) : (
                        <li>Loading...</li>
                      )}
                    </ul>

                  </div>

                </div>
                {/* IN PROGRESS */}
                <div className="col-lg-4" style={{
                  width: '20%'
                }}>
                  <div className="card-body">
                    <div className="dropdown float-end" style={{ transform: 'rotate(270deg)' }}>
                      <a href="#" className="dropdown-toggle arrow-none" data-bs-toggle="dropdown"
                        aria-expanded="false">
                        <i className="mdi mdi-dots-vertical m-0 text-muted h3"></i>
                      </a>
                      <div className="dropdown-menu dropdown-menu-end">
                        <a className="dropdown-item" href="#">Edit</a>
                        <a className="dropdown-item" href="#">Delete</a>
                        <a className="dropdown-item" href="#">Add Members</a>
                        <a className="dropdown-item" href="#">Add Due Date</a>
                      </div>
                    </div>
                    <i className="fa-solid fa-circle-check fa-xl"></i>
                    <h4 className="header-title" style={{
                      position: 'static',
                      top: '15.4%',
                      fontWeight: 'bold',
                      fontSize: 'x-large',
                      marginLeft: '6%',
                      marginTop: '-4.5%',
                    }}>
                      In Progress
                    </h4>
                    <p className="sub-header">
                    </p>

                    <ul className="sortable-list tasklist list-unstyled" id="completed">
                      {filteredData ? (
                        filteredData
                          .filter((ticket) => ticket.status === 'In progress') // Filter by status
                          .map((ticket) => (
                            <li
                              key={ticket.id}
                              style={{ borderRadius: '9px', backgroundColor: '#ffffff' }}
                            >
                              <h5 className="mt-0"><a href="javascript: void(0);" className="text-dark">{ticket.id}</a></h5>
                              <div className="form-check float-end ps-0">
                                <div className="text-end">
                                  <a href="javascript: void(0);" className="text-muted">
                                    <img src="assets/images/users/user-3.jpg" alt="task-user"
                                      className="avatar-sm img-thumbnail rounded-circle" />
                                  </a>
                                </div>
                              </div>
                              <p>{ticket.title}</p>
                              <div className="clearfix"></div>
                              <div className="row">
                                <div className="col">
                                  <p className="font-13 mt-2 mb-0"><i className="mdi mdi-calendar"></i> {ticket.date}</p>
                                </div>
                                <div className="col-auto">

                                  <span className=" badge bg-soft-success text-success float-end">Low</span>

                                </div>
                              </div>
                            </li>
                          ))
                      ) : (
                        <li>Loading...</li>
                      )}
                    </ul>
                  </div>
                </div>
                {/* DONE */}
                <div className="col-lg-4" style={{
                  width: '20%'
                }}>
                  <div className="card-body">
                    <div className="dropdown float-end" style={{ transform: 'rotate(270deg)' }}>
                      <a href="#" className="dropdown-toggle arrow-none" data-bs-toggle="dropdown"
                        aria-expanded="false">
                        <i className="mdi mdi-dots-vertical m-0 text-muted h3"></i>
                      </a>
                      <div className="dropdown-menu dropdown-menu-end">
                        <a className="dropdown-item" href="#">Edit</a>
                        <a className="dropdown-item" href="#">Delete</a>
                        <a className="dropdown-item" href="#">Add Members</a>
                        <a className="dropdown-item" href="#">Add Due Date</a>
                      </div>
                    </div>
                    <i className="fa-solid fa-circle-check fa-xl"></i>
                    <h4 className="header-title" style={{
                      position: 'static',
                      top: '15.4%',
                      fontWeight: 'bold',
                      fontSize: 'x-large',
                      marginLeft: '6%',
                      marginTop: '-4.5%',
                    }}>
                      Completed
                    </h4>
                    <p className="sub-header">
                    </p>

                    <ul className="sortable-list tasklist list-unstyled" id="completed">
                      {filteredData ? (
                        filteredData
                          .filter((ticket) => ticket.status === 'Complete') // Filter by status
                          .map((ticket) => (
                            <li
                              key={ticket.id}
                              style={{ borderRadius: '9px', backgroundColor: '#ffffff' }}
                            >
                              <h5 className="mt-0"><a href="javascript: void(0);" className="text-dark">Brand logo
                                design</a></h5>
                              <div className="form-check float-end ps-0">
                                <div className="text-end">
                                  <a href="javascript: void(0);" className="text-muted">
                                    <img src="assets/images/users/user-3.jpg" alt="task-user"
                                      className="avatar-sm img-thumbnail rounded-circle" />
                                  </a>
                                </div>
                              </div>
                              <p>Various versions have evolved over the years, sometimes by accident.</p>
                              <div className="clearfix"></div>
                              <div className="row">
                                <div className="col">
                                  <p className="font-13 mt-2 mb-0"><i className="mdi mdi-calendar"></i> {ticket.date}</p>
                                </div>
                              </div>
                              <span className=" badge bg-soft-success text-success float-end">Low</span>

                            </li>
                          ))
                      ) : (
                        <li>Loading...</li>
                      )}
                    </ul>
                  </div>
                </div>
                {/* CANCELED */}
                <div className="col-lg-4" style={{
                  width: '20%'
                }}>
                  <div className="card-body">
                    <div className="dropdown float-end" style={{ transform: 'rotate(270deg)' }}>
                      <a href="#" className="dropdown-toggle arrow-none" data-bs-toggle="dropdown"
                        aria-expanded="false">
                        <i className="mdi mdi-dots-vertical m-0 text-muted h3"></i>
                      </a>
                      <div className="dropdown-menu dropdown-menu-end">
                        <a className="dropdown-item" href="#">Edit</a>
                        <a className="dropdown-item" href="#">Delete</a>
                        <a className="dropdown-item" href="#">Add Members</a>
                        <a className="dropdown-item" href="#">Add Due Date</a>
                      </div>
                    </div>
                    <i className="fa-solid fa-circle-check fa-xl"></i>
                    <h4 className="header-title" style={{
                      position: 'static',
                      top: '15.4%',
                      fontWeight: 'bold',
                      fontSize: 'x-large',
                      marginLeft: '6%',
                      marginTop: '-4.5%',
                    }}>
                      Canceled
                    </h4>
                    <p className="sub-header">
                    </p>

                    <ul className="sortable-list tasklist list-unstyled" id="completed">
                      {filteredData ? (
                        filteredData
                          .filter((ticket) => ticket.status === 'Canceled') // Filter by status
                          .map((ticket) => (
                            <li
                              key={ticket.id}
                              style={{ borderRadius: '9px', backgroundColor: '#ffffff' }}
                            >
                              <h5 className="mt-0"><a href="javascript: void(0);" className="text-dark">{ticket.id}</a></h5>
                              <div className="form-check float-end ps-0">
                                <input className="form-check-input" type="checkbox" value=""></input>
                              </div>
                              <p>{ticket.title}</p>
                              <div className="clearfix"></div>
                              <div className="row">
                                <div className="col">
                                  <p className="font-13 mt-2 mb-0"><i className="mdi mdi-calendar"></i>{ticket.date}
                                  </p>
                                </div>
                                <div className="col-auto">
                                  <div className="text-end">
                                    <a href="javascript: void(0);" className="text-muted">
                                      <img src="assets/images/users/user-3.jpg" alt="task-user"
                                        className="avatar-sm img-thumbnail rounded-circle" />
                                    </a>
                                  </div>
                                </div>
                              </div>
                              <span className=" badge bg-soft-success text-success float-end">Low</span>
                            </li>
                          ))
                      ) : (
                        <li>Loading...</li>
                      )}
                    </ul>
                  </div>
                </div>
              </div>

            </div>

          </div>



        </div>
      </div>
      <div className="offcanvas offcanvas-end right-bar" tabIndex="-1" id="theme-settings-offcanvas">
        <div className="d-flex align-items-center w-100 p-0 offcanvas-header">
          <ul className="nav nav-tabs nav-bordered nav-justified w-100" role="tablist">
            <li className="nav-item">
              <a className="nav-link py-2" data-bs-toggle="tab" href="#chat-tab" role="tab">
                <i className="mdi mdi-message-text d-block font-22 my-1"></i>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link py-2" data-bs-toggle="tab" href="#tasks-tab" role="tab">
                <i className="mdi mdi-format-list-checkbox d-block font-22 my-1"></i>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link py-2 active" data-bs-toggle="tab" href="#settings-tab" role="tab">
                <i className="mdi mdi-cog-outline d-block font-22 my-1"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div >









  );
};

export default App;