import guestList from '../../../../assets/images/guestlist.jpg'
import venue from '../../../../assets/images/venue.jpg'
import budget from '../../../../assets/images/budget.jpg'
import calendar from '../../../../assets/images/calendar.jpg'
import invite from '../../../../assets/images/invite.jpg'
import directions from '../../../../assets/images/directions.jpg'
import personal from '../../../../assets/images/personal.jpg'
import relax from '../../../../assets/images/relax.jpg'

export type CarouselItemType = {
  id: number
  imageSrc: string
  title: string
}

const items: CarouselItemType[] = [
  {
    id: 1,
    imageSrc: guestList,
    title: 'Organise your guestlists'
  },
  {
    id: 2,
    imageSrc: venue,
    title: 'Find your perfect venue'
  },
  {
    id: 3,
    imageSrc: budget,
    title: 'Easily track your budget'
  },
  {
    id: 4,
    imageSrc: calendar,
    title: 'Take the stress out of planning multiple events'
  },
  {
    id: 5,
    imageSrc: invite,
    title: 'Design your own invites'
  },
  {
    id: 6,
    imageSrc: personal,
    title: 'Keep it personal'
  },
  {
    id: 7,
    imageSrc: directions,
    title: 'Keep things simple for your guests'
  },
  {
    id: 8,
    imageSrc: relax,
    title: 'Relax throughout the whole planning process'
  }
]

export default items
