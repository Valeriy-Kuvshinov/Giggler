import { UserGigs } from "../cmps/UserGigs"
import { UserInfo } from "../cmps/UserInfo"

export function UserProfile() {
  return (
    <section className="main-container full">
      <div className="user-profile">
        <UserInfo />
        <UserGigs />
      </div>
    </section>
  )
}
