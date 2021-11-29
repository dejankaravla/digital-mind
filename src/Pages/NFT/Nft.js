import React from "react";
import { useSelector } from "react-redux";
import "../../Styles/NFT/Nft.css";
import cBadge from "../../Images/c_badge.svg";
import solseaBadge from "../../Images/Solsea_Badge.svg";

function Nft() {
  const singleNft = useSelector((state) => state.nft.singleNft);
  console.log(singleNft);

  return (
    <div className="Nft">
      <div className="Nft__container">
        <div className="Nft__Left">
          <div className="Nft__cardImg">
            <img src={singleNft.Preview_URL} alt="nft img" />
          </div>
          <dvi className="Nft__smallCardsInfo">
            <div className="Nft__smallCards">
              {singleNft.Properties.attributes.map((attr) => {
                return (
                  <div className="Nft__smallCard">
                    <h4>{attr.trait_type}</h4>
                    <h4>{attr.value}</h4>
                  </div>
                );
              })}
            </div>
            <div className="Nft__cardBreakLine"></div>
            <p>{singleNft ? singleNft.Description : ""}</p>
          </dvi>
        </div>
        <div className="Nft__right">
          <div className="Nft__cardInfo">
            <div className="Nft__cardIcons">
              <div className="Nft__cardIconsEye">
                <i class="far fa-eye"></i>
                <span>{singleNft.views}</span>
              </div>
              <div className="Nft__cardIconsHeart">
                <i class="far fa-heart"></i>
                <span>{singleNft.liked}</span>
              </div>
            </div>
            <h3>Creator</h3>
            <div className="Nft__creatorInfo">
              <img src="" alt="creator img" />
              <div className="Nft__creatorNameTag">
                <h4>Dejan Karavla ✍️</h4>
                <p>asdasdasd</p>
              </div>
            </div>
            <div className="Nft__cardName">
              <h1>{singleNft.Title}</h1>
              {singleNft.verified ? <i class="fas fa-check-circle"></i> : null}
            </div>
            <div className="Nft__cardBreakLine"></div>
            <div>
              <div className="Nft__cardInfoLeft">
                <img src={cBadge} alt="card badge"></img>
                <span>
                  <strong>Licence: </strong>
                  {singleNft.LicenseTitle || "None attached"}
                </span>
              </div>
              <div className="Nft__cardInfoLeft">
                <img src={solseaBadge} alt="card badge"></img>
                <span>Minted on SolSea</span>
              </div>
            </div>
            <div className="Nft__cardBreakLine"></div>

            <div className="Nft__cardTags">
              {singleNft.tags.map((tag) => {
                return <p key={tag}>{tag}</p>;
              })}
            </div>
            <div className="Nft__cardBreakLine"></div>
            <div className="Nft__cardCollectionInfoImg">
              <img src="" alt="collection img" />
              <div className="Nft__cardCollectionInfo">
                <div className="Nft__cardCollectionName">
                  <h3>Mila Kolekcija</h3>
                  {singleNft.verified ? <i class="fas fa-check-circle"></i> : null}
                </div>
                <p>{singleNft.Description}</p>
              </div>
            </div>

            <p className="Nft__cardWarning">⚠️ Unverified NFT - please check everything before you buy</p>
            <div className="Nft__cardButtonsSocialAlert">
              <button>
                <i class="fas fa-share-alt"></i> Share
              </button>
              <button>
                <i class="fas fa-globe-americas"></i> View on Solana
              </button>
              <button>
                {" "}
                <i class="fas fa-flag"></i> Report as fake
              </button>
            </div>
          </div>
          <div className="Nft__cardBuy">
            <p>
              <strong>Listed by:</strong> {singleNft.sellerKey}
            </p>
            <div className="Nft__cardBreakLine"></div>
            <h2>
              500000 <span>SOL</span>
            </h2>
            <div className="Nft__cardBreakLine"></div>
            <p>
              Creator royalties on secondary sales: <strong>3 %</strong>
            </p>
            <button>Connect Your Wallet</button>
            <div className="Nft__cardBuyInfo">
              <p>
                Double-check everything before you buy!{" "}
                <a
                  href="https://docs.solsea.io/getting-started/how-to-spot-a-fake-nft"
                  target="_blank"
                  rel="noreferrer"
                >
                  How to spot fakes?
                </a>
              </p>
              <p>Read our Terms and Conditions before you buy!</p>
            </div>
          </div>
          <div className="Nft__history">
            <div className="Nft__firstTransaction">
              <p>25.00 SOL</p>
              <p>Buyer GqTFJAPNbjiD8GqfNqi3F9qAMTH2aip1cUwdPQJSjHHh</p>
              <p>At 2021-11-24T13:47:47.445Z</p>
            </div>
            <div className="Nft__firstTransaction">
              <p>25.00 SOL</p>
              <p>Buyer GqTFJAPNbjiD8GqfNqi3F9qAMTH2aip1cUwdPQJSjHHh</p>
              <p>At 2021-11-24T13:47:47.445Z</p>
            </div>
            <div className="Nft__firstTransaction">
              <p>3.00 SOL</p>
              <p>Buyer 8p9GT3ShR92EMSHxaJEzhMBoiQgNGxYtALQq8axWPw5X</p>
              <p>At 2021-11-24T22:28:20.458Z</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Nft;
