import Link from "next/link"
import Router, { useRouter } from "next/router"
import { useAppSelector } from "../src/a0-common/c3-hooks";
import Button from "../src/a1-ui/u1-components/cp1-elements/el02-Button/Button";
import { BrandIcon } from "../src/a1-ui/u1-components/cp1-elements/el10-Icons/BrandIcon";
import { Icon } from "../src/a1-ui/u1-components/cp1-elements/el10-Icons/Icon";
import { MainLayout } from "../src/a1-ui/u1-components/cp4-layouts/MainLayout";
import { wrapper } from "../src/a2-bll/store";

export default function NotFound({ history, props }: any) {
  const router = useRouter()
  const categories = useAppSelector(state => state.categories)
  const onGotoPreviousClick = () => {
    if (!history || history.length < 2) { // to main page
      router.push('/');
    } else {
      router.push(history[history.length - 2]);
    }
  }
/*   return <>
    not found
    <Link href="/dd"><a>
      link
    </a>
    </Link>
  </> */
  return (
    <MainLayout title={"Page Not Found"} categories={categories} history={history}>
      <div className="notFound">
        <div className="iconized logo">
          <Link href="/"><a>
            <BrandIcon name="handmfull" size="max" />
          </a></Link>
        </div>
        <h2>page not found</h2>
        <p>We're sorry, but the page you're looking for is currently unavailable</p>
        <Button variant="ok__alt" onClick={onGotoPreviousClick} orientation="left">
          <div className="iconized wide">
            <Icon name="chevron-right" size="full" rotate={3} />
            <div className="button-text">
              {!history || history.length < 2
                ? "go to main"
                : "go to previous"}
            </div>
          </div>
        </Button>
      </div>
    </MainLayout>
  )
}
