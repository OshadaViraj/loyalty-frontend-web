import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  Grid,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { useState } from "react";
import AddUserModal from "../../components/user/AddUser";
import styles from "./Home.module.scss";
import LoyaltyIcon from "@mui/icons-material/Loyalty";
import IconButton from "@mui/material/IconButton";
import { stringAvatar } from "../../utils/util";
import { Edit } from "@mui/icons-material";
import EditUserModal from "../../components/user/EditUser";
import { TUser } from "../../store/user.type";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { selectUser, fetchUsers } from "../../store/userSlice";
import PointModal from "../../components/user/PointModal";

export function HomePage() {
  const [openAddUser, setOpenAddUser] = useState<boolean>(false);
  const [openEditUser, setOpenEditUser] = useState<boolean>(false);
  const [openUpdatePoints, setOpenUpdatePoints] = useState<{
    type: "add" | "redeem";
    state: boolean;
  } | null>(null);
  const [selectedUser, setSelectedUser] = useState<TUser | null>(null);

  const userSelector = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  const closeAddUserModal = () => {
    setOpenAddUser(false);
  };

  const closeEditUserModal = () => {
    setSelectedUser(null);
    setOpenEditUser(false);
  };

  const closePointsUserModal = () => {
    setSelectedUser(null);
    setOpenUpdatePoints(null);
  };

  const openPointsUserModal = (user: TUser, type: "add" | "redeem") => {
    setSelectedUser(user);
    setOpenUpdatePoints({ type: type, state: true });
  };


  return (
    <div className={styles.frame}>
      <header className={styles.appHeader}>
        <Typography variant="h6">WELCOME TO ABC LOYALTY</Typography>
        <Button variant="contained" onClick={() => setOpenAddUser(true)}>
          Add User
        </Button>
      </header>
      <section className={styles.section}>
        <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          {userSelector.status === "loading" ? (
            <CircularProgress />
          ) : (
            userSelector.users.map((user) => (
              <Grid item xs={2} key={user.id}>
                <Card
                  sx={{ overflow: "auto" }}
                  variant="elevation"
                  elevation={1}
                >
                  <React.Fragment>
                    <CardContent>
                      <div className={styles.rowSpaced}>
                        <div className={styles.row}>
                          <Avatar
                            {...stringAvatar(user.firstName, user.lastName)}
                          />
                          <Typography
                            sx={{ fontSize: 14 }}
                            color="text.secondary"
                            gutterBottom
                          >
                            {user.firstName} {user.lastName}
                          </Typography>
                        </div>
                        <IconButton
                          size="small"
                          onClick={() => {
                            setSelectedUser(user);
                            setOpenEditUser(true);
                          }}
                          aria-label="editUser"
                          color="secondary"
                        >
                          <Edit />
                        </IconButton>
                      </div>
                      <span className={styles.loyalty}>
                        <LoyaltyIcon color="secondary" />
                        <Typography color="text.secondary" alignItems="center">
                          {user.totalPoints} points redeemable
                        </Typography>
                      </span>
                      <div className={styles.footer}>
                        <Button
                          onClick={() => openPointsUserModal(user, "add")}
                          variant="outlined"
                          size="small"
                        >
                          Add points
                        </Button>
                        <Button
                          onClick={() => openPointsUserModal(user, "redeem")}
                          variant="outlined"
                          size="small"
                        >
                          Redeem points
                        </Button>
                      </div>
                    </CardContent>
                    <CardActions>
                      {/* <Typography variant="caption" alignItems="center">
                      last updated at: {moment(user.lastUpdatedAt).format("DD-MM-yyyy, h:mm:ss a")}
                    </Typography> */}
                    </CardActions>
                  </React.Fragment>
                </Card>
              </Grid>
            ))
          )}
        </Grid>
      </section>
      {openAddUser && (
        <AddUserModal open={openAddUser} onClose={closeAddUserModal} />
      )}
      {openEditUser && selectedUser && (
        <EditUserModal
          user={selectedUser}
          open={openEditUser}
          onClose={closeEditUserModal}
        />
      )}
      {openUpdatePoints && openUpdatePoints.state && selectedUser && (
        <PointModal
          user={selectedUser}
          type={openUpdatePoints.type}
          open={openUpdatePoints.state}
          onClose={closePointsUserModal}
        />
      )}
    
    </div>
  );
}
