import React, { useEffect } from "react";
import "../../Styles/Explore/Explore.css";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { getNft, setTitleInput, setAllTags, getselectedOption, setSingleNft } from "../../features/nft";
import { setInfinite, setSelectedOptionControl, setSolSea, setVerified, setIncludeNsfw } from "../../features/controls";

// Images import
import Cube from "../../Images/cube.svg";
import Art from "../../Images/art.svg";
import Painting from "../../Images/painting.svg";
import PersonalPhoto from "../../Images/personalPhoto.svg";
import Photography from "../../Images/photography.svg";
import TradingCards from "../../Images/trading-cards.svg";
import Camera from "../../Images/camera.svg";
import cBadge from "../../Images/c_badge.svg";
import solseaBadge from "../../Images/Solsea_Badge.svg";
import rank from "../../Images/rank.svg";

function Explore() {
  const nft = useSelector((state) => state.nft.nft);
  const selectedOption = useSelector((state) => state.nft.selectedOption);
  const allTags = useSelector((state) => state.nft.allTags);
  const nftTitle = useSelector((state) => state.nft.titleInput);
  const mintNft = useSelector((state) => state.nft.mintNft);

  const infinite = useSelector((state) => state.controls.infinite);
  const selectedOptionControl = useSelector((state) => state.controls.selectedOptionControl);
  const solSea = useSelector((state) => state.controls.solSea);
  const verified = useSelector((state) => state.controls.verified);
  const includeNsfw = useSelector((state) => state.controls.includeNsfw);

  const dispatch = useDispatch();
  console.log(nft);

  const getSingleNft = (mint) => {
    axios.get(`https://test-api.solsea.io/fetch-nft/${mint}`).then((response) => {
      dispatch(setSingleNft(response.data));
    });
  };

  useEffect(() => {
    axios.get(`https://test-api.solsea.io/nft-listed/?$limit=20`).then((response) => {
      dispatch(getNft(response.data.data));
      let newTags = new Set();
      response.data.data.forEach((data) => {
        data.tags.forEach((tag) => {
          newTags.add(tag);
        });
      });

      dispatch(setInfinite(true));
      dispatch(setAllTags([...newTags]));
    });
  }, [nftTitle, dispatch]);

  const fetchData = () => {
    axios.get(`https://test-api.solsea.io/nft-listed/?$limit=20&$skip=${nft.length}`).then((response) => {
      const newData = [...nft, ...response.data.data];
      dispatch(getNft(newData));
    });
  };
  const searchByName = (e) => {
    e.preventDefault();
    axios.get(`https://test-api.solsea.io/nft-listed/?Title=${nftTitle}`).then((response) => {
      dispatch(setInfinite(false));
      dispatch(getNft(response.data.data));
    });
  };

  const filterByIcons = (icon) => {
    const filteredNft = nft.filter((card) => {
      return card.tags.includes(icon);
    });
    dispatch(setSelectedOptionControl(setSelectedOptionControl(false)));
    dispatch(getselectedOption(filteredNft));
  };

  useEffect(() => {
    if (verified === true) {
      const filteredNft = nft.filter((card) => {
        return card.verified === true;
      });
      dispatch(setSelectedOptionControl(true));
      dispatch(getselectedOption(filteredNft));
    } else if (includeNsfw === true) {
      const filteredNft = nft.filter((card) => {
        console.log(card.nsfw);
        return card.nsfw === true;
      });
      dispatch(setSelectedOptionControl(true));
      dispatch(getselectedOption(filteredNft));
    } else if (verified || solSea || includeNsfw === false) {
      dispatch(setSelectedOptionControl(false));
    }
  }, [verified, solSea, includeNsfw]);

  const sortingNft = (sortingComand) => {
    const sortedNft = [...nft];
    sortedNft.sort((a, b) => {
      if (sortingComand === "Price ↑") return a.price - b.price;
      if (sortingComand === "Price ↓") return b.price - a.price;
      if (sortingComand === "Rarity Rank ↑") return (a.rarity_rank || 0) - (b.rarity_rank || 0);
      if (sortingComand === "Rarity Rank ↓") return (b.rarity_rank || 0) - (a.rarity_rank || 0);
      if (sortingComand === "Created ↑") return Date.parse(a.createdAt) - Date.parse(b.createdAt);
      if (sortingComand === "Created ↓") return Date.parse(b.createdAt) - Date.parse(a.createdAt);
      if (sortingComand === "Likes ↑") return a.liked - b.liked;
      if (sortingComand === "Likes ↓") return b.liked - a.liked;
      if (sortingComand === "Views ↑") return a.views - b.views;
      if (sortingComand === "Views ↓") return b.views - a.views;
      if (sortingComand === "Listed ↑") return Date.parse(a.listedAt) - Date.parse(b.listedAt);
      if (sortingComand === "Listed ↓") return Date.parse(b.listedAt) - Date.parse(a.listedAt);
      else return nft;
    });
    dispatch(getNft(sortedNft));
  };

  const filterByTags = (tag) => {
    const filteredNft = nft.filter((card) => {
      return card.tags.includes(tag);
    });
    dispatch(setSelectedOptionControl(setSelectedOptionControl(false)));
    dispatch(getselectedOption(filteredNft));
  };

  return (
    <div className="Explore">
      <div className="Explore__container">
        <div className="Explore__header">
          <h1>Explore our NFT Art Marketplace</h1>
          <form className="Explore__searchInput">
            <input
              onChange={(e) => dispatch(setTitleInput(e.target.value))}
              type="text"
              placeholder="Search by NFT name"
            />
            <button type="submit" onClick={(e) => searchByName(e)}>
              <i className="fas fa-search"></i>
            </button>
          </form>
          <div className="Explore__filterIcons">
            <div onClick={() => filterByIcons("3D")} className="Explore__FilterIcon">
              <img src={Cube} alt="project img" />
              <span>3D</span>
            </div>
            <div onClick={() => filterByIcons("Art")} className="Explore__FilterIcon">
              <img src={Art} alt="project img" />
              <span>Art</span>
            </div>
            <div onClick={() => filterByIcons("Painting")} className="Explore__FilterIcon">
              <img src={Painting} alt="project img" />
              <span>Painting</span>
            </div>
            <div onClick={() => filterByIcons("PFP")} className="Explore__FilterIcon">
              <img src={PersonalPhoto} alt="project img" />
              <span>PFP</span>
            </div>
            <div onClick={() => filterByIcons("Photography")} className="Explore__FilterIcon">
              <img src={Photography} alt="project img" />
              <span>Photo</span>
            </div>
            <div onClick={() => filterByIcons("Collectible")} className="Explore__FilterIcon">
              <img src={TradingCards} alt="project img" />
              <span>Trading Cards</span>
            </div>
            <div onClick={() => filterByIcons("Video")} className="Explore__FilterIcon">
              <img src={Camera} alt="project img" />
              <span>Video</span>
            </div>
          </div>
          <div className="Explore__breakLine"></div>
          <div className="Explore__optionsContainer">
            <div className="Explore__optionsCheckBoxes">
              <div className="Explore__optionCheckBox">
                <label className="Explore__optionCheckBoxSwitch">
                  <input onChange={() => dispatch(setSolSea(!solSea))} type="checkbox" />
                  <span></span>
                </label>
                <label>SolSea</label>
              </div>
              <div className="Explore__optionCheckBox">
                <label className="Explore__optionCheckBoxSwitch">
                  <input onChange={() => dispatch(setVerified(!verified))} type="checkbox" />
                  <span></span>
                </label>
                <label>Verified</label>
              </div>
              <div className="Explore__optionCheckBox">
                <label className="Explore__optionCheckBoxSwitch">
                  <input onChange={() => dispatch(setIncludeNsfw(!includeNsfw))} type="checkbox" />
                  <span></span>
                </label>
                <label>Incl. NSFW</label>
              </div>
            </div>
            <div className="Explore__optionsFilters">
              <select onChange={(e) => sortingNft(e.currentTarget.value)} className="Explore__optionsFilter">
                <option selected disabled hidden>
                  Sort By...
                </option>
                <option>Price ↑</option>
                <option>Price ↓</option>
                <option>Rarity Rank ↑</option>
                <option>Rarity Rank ↓</option>
                <option>Created ↑</option>
                <option>Created ↓</option>
                <option>Likes ↑</option>
                <option>Likes ↓</option>
                <option>Views ↑</option>
                <option>Views ↓</option>
                <option>Listed ↑</option>
                <option>Listed ↓</option>
              </select>
              <select className="Explore__optionsFilter">
                <option selected disabled hidden>
                  Single/Collection
                </option>
                <option>All</option>
                <option>In Collection</option>
                <option>Single Piece</option>
              </select>
              <select onChange={(e) => filterByTags(e.currentTarget.value)} className="Explore__optionsFilter">
                {allTags.map((tag) => {
                  return <option>{tag}</option>;
                })}
              </select>
              <select className="Explore__optionsFilter">
                <option selected disabled hidden>
                  Select License
                </option>
                <option>Public display/Non-Commercial exploitation</option>
                <option>Reproduction/Commercial exploitation</option>
              </select>
            </div>
          </div>
        </div>
        <div className="Explore__cards">
          <div className="Explore__cardsContainer">
            <div className="Explore__cardsHeader">
              <div className="Explore__cardsButtons">
                <div className="Explore__cardsButton">
                  <p>Explore</p>
                  <div className="Explore__cardsButtonUnderline"></div>
                </div>
                <div className="Explore__cardsButton">
                  <p>Activity</p>
                  <div className="Explore__cardsButtonUnderline"></div>
                </div>
              </div>
              <p className="Explore__cardsTotalItems">
                Total Items: {selectedOptionControl ? selectedOption.length : nft.length}
              </p>
            </div>

            <InfiniteScroll
              dataLength={nft.length} //This is important field to render the next data
              next={fetchData}
              hasMore={infinite}
              endMessage={
                <p style={{ textAlign: "center" }}>
                  <b>Yay! You have seen it all</b>
                </p>
              }
            >
              {(selectedOptionControl ? selectedOption : nft).map((card) => {
                return (
                  <Link
                    onClick={() => getSingleNft(card.Mint)}
                    to="/nft"
                    key={card._id}
                    className="Explore__cardSingle"
                  >
                    <div className="Explore__cardSingleId">
                      <span>{card.Title}</span>
                      {card.verified ? <i className="fas fa-check-circle "></i> : null}
                    </div>
                    <div className="Explore__cardCollectionPage">
                      {card.verified ? <i className="fas fa-check-circle"></i> : null}
                      {card.nft_collection ? <span>{card.nft_collection.title}</span> : null}
                    </div>
                    <div className="Explore__cardBreakLine"></div>
                    <div className="Explore__cardImg">
                      <img src={card.Preview_URL} alt="card img" />
                    </div>
                    <div className="Explore__cardBreakLine"></div>
                    <div className="Explore__cardPrice">
                      <p>
                        {card.price} <span>SOL</span>
                      </p>
                      {card.rarity_rank ? (
                        <div className="Explore__cardRank">
                          <span>{card.rarity_rank}</span>
                          <img src={rank} alt="card radnk" />
                        </div>
                      ) : null}
                    </div>
                    <div className="Explore__cardBreakLine"></div>
                    <div className="Explore__cardInfo">
                      <div className="Explore__cardInfoLeft">
                        <img src={cBadge} alt="card badge"></img>
                        <span>{card.LicenseTitle}</span>
                      </div>
                      <div className="Explore__cardInfoRightEye">
                        <span>{card.views}</span>
                        <i className="far fa-eye"></i>
                      </div>
                    </div>
                    <div className="Explore__cardInfo">
                      <div className="Explore__cardInfoLeft">
                        <img src={solseaBadge} alt="card badge"></img>
                        <span>Minted on SolSea</span>
                      </div>
                      <div className="Explore__cardInfoRightHeart">
                        <span>{card.liked}</span>
                        <i className="far fa-heart"></i>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </InfiniteScroll>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Explore;
