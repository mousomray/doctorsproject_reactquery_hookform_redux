import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { recent, search } from './pagesslice';

const Sidebar = () => {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch Recent Blog Data
  const getRecentData = async () => {
    const response = await dispatch(recent());
    return response?.payload;
  };

  // Fetch Search Data
  const getSearchData = async () => {
    const response = await dispatch(search(searchQuery)); // Pass searchQuery to the search action
    return response?.payload;
  };

  // Query for Recent Blog
  const { isLoading: recentLoading, data: recentBlogData } = useQuery({
    queryKey: ['recentData'],
    queryFn: getRecentData,
  });

  // Query for Search Data
  const { data: searchData } = useQuery({
    queryKey: ['searchData', searchQuery], // Include searchQuery in the queryKey
    queryFn: getSearchData,
    enabled: !!searchQuery, // Ensure search query is not empty before fetching data
  });

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className="col-lg-4" style={{ boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.1)' }}>
      <div className="sidebar" data-aos="fade-left">
        <h3 className="sidebar-title">Search</h3>
        <div className="sidebar-item search-form">
          <form onSubmit={(e) => e.preventDefault()}>
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search..."
              style={{ height: '50px', marginBottom: '20px' }}
            />
          </form>
          <div>
            {Array.isArray(searchData) && searchData.length > 0 && (
              <div className="sidebar-item recent-posts">
                {searchData.map((value) => (
                  <div key={value._id} className="post-item clearfix">
                    <img
                      src={`${process.env.REACT_APP_BASE_URL}${value.image}`}
                      alt=""
                      style={{ height: '100px' }}
                    />
                    <div>
                      <p>
                        <i className="far fa-calendar-alt"></i>{' '}
                        {value &&
                          new Date(value.createdAt).toLocaleString('en-US', {
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric',
                            hour: 'numeric',
                            minute: 'numeric',
                            hour12: true,
                          })}
                      </p>
                    </div>
                    <h6>
                      <Link to={`/blogdetails/${value._id}`}>{value.title}</Link>
                    </h6>
                  </div>
                ))}
              </div>
            )}
            {searchData && searchData.length === 0 && (
              <p style={{ color: 'red' }}>No Results Found</p>
            )}
          </div>
        </div>
        <h3 className="sidebar-title">Recent Posts</h3>
        <div className="sidebar-item recent-posts">
          {recentBlogData &&
            recentBlogData.map((value) => (
              <div key={value._id} className="post-item clearfix">
                <img
                  src={`${process.env.REACT_APP_BASE_URL}${value.image}`}
                  alt=""
                  style={{ height: '100px' }}
                />
                <div>
                  <p>
                    <i className="far fa-calendar-alt"></i>{' '}
                    {value &&
                      new Date(value.createdAt).toLocaleString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                        hour: 'numeric',
                        minute: 'numeric',
                        hour12: true,
                      })}
                  </p>
                </div>
                <h6>
                  <Link to={`/blogdetails/${value._id}`}>{value.title}</Link>
                </h6>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
