import { NewsFeed, NewsStore } from './types';
export default class Store implements NewsStore {
    private feeds: NewsFeed[];
    private _currentPage: number;

    constructor() {
        this.feeds = [];
        this._currentPage = 1;
    }

    get currentPage() {
        return this._currentPage;
    }

    set currentPage(page: number) {
        this._currentPage = page;
    }

    get nextPage(): number {
        const pageCount = this.numberOfFeed / 10;
        return this._currentPage < pageCount ? this._currentPage + 1 : this._currentPage;
    }

    get prevPage(): number {
        return this._currentPage > 1 ? this._currentPage - 1 : 1;
    }

    get numberOfFeed(): number {
        return this.feeds.length;
    }

    get hasFeed(): boolean {
        return this.feeds.length > 0;
    }

    getAllFeeds(): NewsFeed[] {
        return this.feeds;
    }

    getFeed(positon: number): NewsFeed {
        return this.feeds[positon];
    }

    setFeeds(feeds: NewsFeed[]): void {
        this.feeds = feeds.map(feed=>({
            ...feed,
            read: false
        }))
    }

    makeRead(id: number): void {
        const feed = this.feeds.find((feed: NewsFeed) => feed.id === id);

        if(feed) {
            feed.read = true;
        }
    }
}