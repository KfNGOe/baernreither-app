(window.webpackJsonp=window.webpackJsonp||[]).push([[74,193,195,196],{156:function(e,_,t){"use strict";t.r(_),t.d(_,"NodeState",(function(){return N}));const N={LEADER:"LEADER",FOLLOWER:"FOLLOWER",CANDIDATE:"CANDIDATE",OUT_OF_SYNC_BLANK:"OUT_OF_SYNC_BLANK"}},225:function(e,_,t){"use strict";t.r(_),t.d(_,"CLUSTER_MANAGEMENT_CONSTANTS",(function(){return s}));var N=t(156),n=t(97);const s={getLegendNodes:function(){const e=[];return e.push({nodeState:N.NodeState.LEADER,customText:"node_state_leader"}),e.push({nodeState:N.NodeState.FOLLOWER,customText:"node_state_follower"}),e.push({nodeState:N.NodeState.OUT_OF_SYNC_BLANK,customText:"node_state_out_of_sync"}),e.forEach((e,_)=>e.id=_),e},getSyncStatuses:()=>[{labelKey:"node_state_candidate",classes:"icon-any",icon:""},{labelKey:"node_state_no_cluster",classes:"close",icon:"X"},{labelKey:"link_state_out_of_sync",classes:"icon-any",icon:""},{labelKey:"node_state_no_connection",classes:"icon-any",icon:""},{labelKey:"node_state_read_only",classes:"icon-any",icon:""},{labelKey:"node_state_restricted",classes:"icon-any",icon:""},{labelKey:"recovery_state.searching_for_node",classes:"fa-d3",icon:""},{labelKey:"recovery_state.waiting_for_snapshot",classes:"fa-d3",icon:""},{labelKey:"recovery_state.building_snapshot",classes:"fa-d3 fa-solid",icon:""},{labelKey:"recovery_state.sending_snapshot",classes:"fa-d3 fa-solid",icon:""},{labelKey:"recovery_state.receiving_snapshot",classes:"fa-d3 fa-solid",icon:""},{labelKey:"recovery_state.applying_snapshot",classes:"fa-d3 fa-solid",icon:""}],getLegendLinks:function(){const e=[];return e.push({status:n.LinkState.IN_SYNC,linkTypeKey:"link_state_in_sync"}),e.push({status:n.LinkState.SYNCING,linkTypeKey:"link_state_syncing"}),e.push({status:n.LinkState.OUT_OF_SYNC,linkTypeKey:"link_state_out_of_sync"}),e.push({status:n.LinkState.RECEIVING_SNAPSHOT,linkTypeKey:"link_state_receiving_snapshot"}),e.forEach((e,_)=>e.id=_),e},SVG_NODE_WIDTH:15,PADDING_LEFT:12,PADDING_TOP:12,TITLE_PADDING_TOP:15,TITLE_FONT_SIZE:13,TITLE_FONT_WEIGHT:700,TITLE_COLOR:"#000000",TITLE_LINE_HEIGHT:18,LEGEND_ITEM_FONT_SIZE:11,LEGEND_ITEM_ICON_FONT_SIZE:15,LEGEND_ITEM_FONT_WEIGHT:400,LEGEND_ITEM_COLOR:"#000000",LEGEND_ITEM_LINE_HEIGHT:13,LEGEND_ITEM_PADDING_LEFT:27,LEGEND_ITEMS_PADDING_TOP:40,LEGEND_ITEM_PADDING_TOP:8,BACKGROUND_PADDING:24}},97:function(e,_,t){"use strict";t.r(_),t.d(_,"NodeState",(function(){return N})),t.d(_,"RecoveryState",(function(){return n})),t.d(_,"LinkState",(function(){return s})),t.d(_,"TopologyState",(function(){return E}));const N={LEADER:"LEADER",FOLLOWER:"FOLLOWER",CANDIDATE:"CANDIDATE",OUT_OF_SYNC:"OUT_OF_SYNC",NO_CONNECTION:"NO_CONNECTION",READ_ONLY:"READ_ONLY",RESTRICTED:"RESTRICTED",NO_CLUSTER:"NO_CLUSTER"},n={SEARCHING_FOR_NODE:"SEARCHING_FOR_NODE",WAITING_FOR_SNAPSHOT:"WAITING_FOR_SNAPSHOT",RECEIVING_SNAPSHOT:"RECEIVING_SNAPSHOT",APPLYING_SNAPSHOT:"APPLYING_SNAPSHOT",BUILDING_SNAPSHOT:"BUILDING_SNAPSHOT",SENDING_SNAPSHOT:"SENDING_SNAPSHOT",RECOVERY_OPERATION_FAILURE_WARNING:"RECOVERY_OPERATION_FAILURE_WARNING"},s={IN_SYNC:"IN_SYNC",OUT_OF_SYNC:"OUT_OF_SYNC",SYNCING:"SYNCING",NO_CONNECTION:"NO_CONNECTION",RECEIVING_SNAPSHOT:"RECEIVING_SNAPSHOT"},E={PRIMARY_NODE:"PRIMARY_NODE",SECONDARY_NODE:"SECONDARY_NODE"}}}]);