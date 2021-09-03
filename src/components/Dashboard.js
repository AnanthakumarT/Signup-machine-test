import { getUsersList, deleteUser } from "../services/commonServices";
import React from "react";

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      usersList: [],
    };
  }

  async componentDidMount() {
    this.getUsers();
  }

  getUsers = async () => {
    const users = await getUsersList();
    await this.setState({ usersList: users });
  };

  editUser = (item) => {
    sessionStorage.setItem('editUser',true)
    sessionStorage.setItem('userData',JSON.stringify(item))
    this.props.history.push("/enter-basic-info");
  };

  deleteUser = async (item) => {
    await deleteUser(item.id);
    this.getUsers();
  };

  render() {
    return (
      <div>
        <div class="dashboard-card card flex flex-column">
          <h1 class="flex flex-start ml-15">Users list</h1>
          <div class="border-bottom" />
          {this.state.usersList &&
            this.state.usersList.map((item, i) => {
              return (
                <div key={i} class="fields-container">
                  <div class="flex flex-row align-center">
                    <div class="w-30">
                      <div class=" flex flex-start">
                        <span class="text-bold">Fist name</span> :{" "}
                        <span> {item.firstName}</span>
                      </div>
                      <div class=" mt-2 flex flex-start">
                        <span class="text-bold">Last name </span>:{" "}
                        <span> {item.lastName}</span>
                      </div>
                      <div class="mt-2 flex flex-start">
                        <span class="text-bold"> Email</span> :{" "}
                        <span> {item.email}</span>
                      </div>
                    </div>
                    <div class="flex flex-row">
                      <button
                        class="small-button mr-15"
                        onClick={() => this.editUser(item)}
                      >
                        EDIT
                      </button>
                      <button
                        className="small-button ml-15"
                        onClick={() => this.deleteUser(item)}
                      >
                        DELETE
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    );
  }
}
