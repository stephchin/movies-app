import { Table, message, Input, Button, Space, Modal } from "antd";
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import { MovieModal } from './MovieModal';
import 'antd/dist/antd.css';

class Movies extends React.Component {
   state = {
     movies: [],
     searchText: '',
     searchedColumn: '',
     modalVisible: false,
     movieInfo: ''
   }

   componentDidMount() {
     this.loadMovies();
   }

   loadMovies = () => {
     const url = "api/v1/movies/index";
     fetch(url)
       .then((data) => {
         if (data.ok) {
           return data.json();
         }
         throw new Error("Network error.");
       })
       .then((data) => {
         console.log("data:");
         console.log(data)
         data.forEach((movie) => {
           const newAttrs = { key: movie.id }
           const newEl = {...newAttrs, ...movie};

           this.setState((prevState) => ({
             movies: [...prevState.movies, newEl],
           }));
         });
       })
       .catch((err) => message.error("Error: " + err));
   };

   reloadMovies = () => {
     this.setState({ movies: [] });
     this.loadMovies();
   };

   getColumnSearchProps = dataIndex => ({
     filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
       <div style={{ padding: 8 }}>
         <Input
           ref={node => {
             this.searchInput = node;
           }}
           placeholder={`Search ${dataIndex}`}
           value={selectedKeys[0]}
           onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
           onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
           style={{ marginBottom: 8, display: 'block' }}
         />
         <Space>
           <Button
             type="primary"
             onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
             icon={<SearchOutlined />}
             size="small"
             style={{ width: 90 }}
           >
             Search
           </Button>
           <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
             Reset
           </Button>
           <Button
             type="link"
             size="small"
             onClick={() => {
               confirm({ closeDropdown: false });
               this.setState({
                 searchText: selectedKeys[0],
                 searchedColumn: dataIndex,
               });
             }}
           >
             Filter
           </Button>
         </Space>
       </div>
     ),
     filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
     onFilter: (value, record) =>
       record[dataIndex]
         ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
         : '',
     onFilterDropdownVisibleChange: visible => {
       if (visible) {
         setTimeout(() => this.searchInput.select(), 100);
       }
     },
     render: text =>
       this.state.searchedColumn === dataIndex ? (
         <Highlighter
           highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
           searchWords={[this.state.searchText]}
           autoEscape
           textToHighlight={text ? text.toString() : ''}
         />
       ) : (
         text
       ),
   });

   handleSearch = (selectedKeys, confirm, dataIndex) => {
     confirm();
     this.setState({
       searchText: selectedKeys[0],
       searchedColumn: dataIndex,
     });
   };

   handleReset = clearFilters => {
     clearFilters();
     this.setState({ searchText: '' });
   };


   isModalVisible = () => {
     this.state.modalVisible == true;
   };

    showModal = movieInfo => {
      this.setState({modalVisible: true, movieInfo: movieInfo });
   };

    handleOk = () => {
      this.setState({modalVisible: false});
   };

    handleCancel = () => {
      this.setState({modalVisible: false});
   };

   columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      ...this.getColumnSearchProps('title'),
      width: "70%",
      sorter: {
        compare: (a, b) => a.title.localeCompare(b.title),
        multiple: 2
      },
      render: (text, movieInfo) => (
        <>
          <span onClick={() => this.showModal(movieInfo)}>
            <a>{movieInfo.title}</a>
          </span>
        </>
      ),
    },
    {
      title: "Release Date",
      dataIndex: "release_date",
      key: "release_date",
      width: "30%",
      defaultSortOrder: 'descend',
      sorter: {
        compare: (a, b) => a.release_date.localeCompare(b.release_date),
        multiple: 1
      }
    }
  ];

  render() {
    return (
      <>
        <Table
          className="table-striped-rows"
          dataSource={this.state.movies}
          columns={this.columns} />
        <Modal
          title={this.state.movieInfo.title}
          visible={this.state.modalVisible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}>
          <MovieModal movie={this.state.movieInfo} />
        </Modal>
      </>
    );
  }
}

export default Movies;
