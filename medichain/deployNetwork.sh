~/fabric-dev-servers/stopFabric.sh
~/fabric-dev-servers/teardownFabric.sh
~/fabric-dev-servers/startFabric.sh
export FABRIC_VERSION=hlfv11
composer card delete -c PeerAdmin@hlfv1
~/fabric-dev-servers/createPeerAdminCard.sh
composer archive create -t dir -n .
composer network install --card PeerAdmin@hlfv1 -a medichain@$1.bna 
composer network start --card PeerAdmin@hlfv1 --networkAdmin admin --networkAdminEnrollSecret adminpw --file networkadmin.card --networkName medichain --networkVersion $1
composer card delete -c admin@medichain
composer card import --file networkadmin.card
composer network ping --card admin@medichain




