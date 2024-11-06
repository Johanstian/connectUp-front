import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/core/services/alert.service';
import { FollowService } from 'src/app/core/services/follow.service';
import { IdentityService } from 'src/app/core/services/identity.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit {

  id: any;
  page: number = 1;
  limit: number = 5;
  users: any;
  following: any;
  follows: any;
  followingUsersIds: any[] = [];

  constructor(
    private alertService: AlertService,
    private identityService: IdentityService,
    private followService: FollowService,
    private userService: UserService) { }

  ngOnInit() {
    this.id = this.identityService.getUser().id;
    this.getUsers();
    this.followingUsers();
  }

  getUsers() {
    this.userService.getAllUsers(this.page - 1, this.limit).subscribe({
      next: (data) => {
        const followingIds = data.users_following ? data.users_following.map((user: any) => user._id) : [];
        this.following = followingIds;
        if (data.users && data.status === 'success') {
          const filtered = data.users
            .filter((user: any) => user._id !== this.id)
            .map((user: any) => ({
              ...user,
              isFollowing: followingIds.includes(user._id)
            }));

          this.users = filtered;
        }
      },
      error: (err) => {
        this.alertService.error('¡Error!', err.error.message);
      }
    });
  }

  followingUsers() {
    this.followService.following(this.id, this.page - 1, this.limit).subscribe({
      next: (data) => {
        this.followingUsersIds = data.users_following;
      },
      error: (err) => {
        this.alertService.error('¡Error!', err.error.message);
      }
    })
  }

  isFollowing(userId: string): boolean {
    return this.followingUsersIds.includes(userId);
  }

  followUser(userId: any) {
    this.followService.follow(userId).subscribe({
      next: (res) => {
        this.alertService.success('¡Correcto!', 'Usuario seguido');
        this.followingUsers();
      },
      error: (error) => {
        this.alertService.error('¡Error!', error.error.message);
      }
    })
  }

  unfollowUser(userId: any) {
    this.followService.unfollow(userId).subscribe({
      next: () => {
        this.alertService.success('¡Correcto!', 'Dejaste de seguir este usuario');
        this.followingUsers();
      },
      error: (err) => {
        this.alertService.error('¡Error!', err.error.message);
      }
    })
  }


}
