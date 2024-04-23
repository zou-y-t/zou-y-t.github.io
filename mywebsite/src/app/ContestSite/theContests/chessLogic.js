//ChessLogic传入参数为起点向量和终点向量，棋子名字，返回值为是否符合规则
function ChessLogic(start, end, name,board,player){
    if(name === "Pawn"){
        if(player === "white"){
            if(start[0] === 6){
                if(end[0] === 4 && start[1] === end[1] && board[end[0]][end[1]].length === 0){
                    return true;
                }
                if(end[0] === 3 && start[1] === end[1] && board[end[0]][end[1]].length === 0){
                    return true;
                }
            }
            if(end[0] === start[0] - 1 && start[1] === end[1] && board[end[0]][end[1]].length === 0){
                return true;
            }
            if(end[0] === start[0] - 1 && Math.abs(start[1] - end[1]) === 1 && board[end[0]][end[1]].length!==0){
                return true;
            }
        }
        if(player === "black"){
            if(start[0] === 1){
                if(end[0] === 3 && start[1] === end[1] && board[end[0]][end[1]].length === 0){
                    return true;
                }
                if(end[0] === 4 && start[1] === end[1] && board[end[0]][end[1]].length === 0){
                    return true;
                }
            }
            if(end[0] === start[0] + 1 && start[1] === end[1] && board[end[0]][end[1]].length === 0){
                return true;
            }
            if(end[0] === start[0] + 1 && Math.abs(start[1] - end[1]) === 1 && board[end[0]][end[1]].length!==0){
                return true;
            }
        }
    }
    if(name === "Rook"){
        if(start[0] === end[0]){
            if(start[1] < end[1]){
                for(let i = start[1] + 1; i < end[1]; i++){
                    if(board[start[0]][i].length !== 0){
                        return false;
                    }
                }
                return true;
            }
            if(start[1] > end[1]){
                for(let i = start[1] - 1; i > end[1]; i--){
                    if(board[start[0]][i].length !== 0){
                        return false;
                    }
                }
                return true;
            }
        }
        if(start[1] === end[1]){
            if(start[0] < end[0]){
                for(let i = start[0] + 1; i < end[0]; i++){
                    if(board[i][start[1]].length !== 0){
                        return false;
                    }
                }
                return true;
            }
            if(start[0] > end[0]){
                for(let i = start[0] - 1; i > end[0]; i--){
                    if(board[i][start[1]].length !== 0){
                        return false;
                    }
                }
                return true;
            }
        }
    }
    if(name === "Knight"){
        if(Math.abs(start[0] - end[0]) === 2 && Math.abs(start[1] - end[1]) === 1){
            return true;
        }
        if(Math.abs(start[0] - end[0]) === 1 && Math.abs(start[1] - end[1]) === 2){
            return true;
        }
    }
    if(name === "Bishop"){
        if(Math.abs(start[0] - end[0]) === Math.abs(start[1] - end[1])){
            if(start[0] < end[0]){
                if(start[1] < end[1]){
                    for(let i = 1; i < end[0] - start[0]; i++){
                        if(board[start[0] + i][start[1] + i].length !== 0){
                            return false;
                        }
                    }
                    return true;
                }
                if(start[1] > end[1]){
                    for(let i = 1; i < end[0] - start[0]; i++){
                        if(board[start[0] + i][start[1] - i].length !== 0){
                            return false;
                        }
                    }
                    return true;
                }
            }
            if(start[0] > end[0]){
                if(start[1] < end[1]){
                    for(let i = 1; i < start[0] - end[0]; i++){
                        if(board[start[0] - i][start[1] + i].length !== 0){
                            return false;
                        }
                    }
                    return true;
                }
                if(start[1] > end[1]){
                    for(let i = 1; i < start[0] - end[0]; i++){
                        if(board[start[0] - i][start[1] - i].length !== 0){
                            return false;
                        }
                    }
                    return true;
                }
            }
        }
    }
    if(name === "Queen"){
        if(start[0] === end[0]){
            if(start[1] < end[1]){
                for(let i = start[1] + 1; i < end[1]; i++){
                    if(board[start[0]][i].length !== 0){
                        return false;
                    }
                }
                return true;
            }
            if(start[1] > end[1]){
                for(let i = start[1] - 1; i > end[1]; i--){
                    if(board[start[0]][i].length !== 0){
                        return false;
                    }
                }
                return true;
            }
        }
        if(start[1] === end[1]){
            if(start[0] < end[0]){
                for(let i = start[0] + 1; i < end[0]; i++){
                    if(board[i][start[1]].length !== 0){
                        return false;
                    }
                }
                return true;
            }
            if(start[0] > end[0]){
                for(let i = start[0] - 1; i > end[0]; i--){
                    if(board[i][start[1]].length !== 0){
                        return false;
                    }
                }
                return true;
            }
        }
        if(Math.abs(start[0] - end[0]) === Math.abs(start[1] - end[1])){
            if(start[0] < end[0]){
                if(start[1] < end[1]){
                    for(let i = 1; i < end[0] - start[0]; i++){
                        if(board[start[0] + i][start[1] + i].length !== 0){
                            return false;
                        }
                    }
                    return true;
                }
                if(start[1] > end[1]){
                    for(let i = 1; i < end[0] - start[0]; i++){
                        if(board[start[0] + i][start[1] - i].length !== 0){
                            return false;
                        }
                    }
                    return true;
                }
            }
            if(start[0] > end[0]){
                if(start[1] < end[1]){
                    for(let i = 1; i < start[0] - end[0]; i++){
                        if(board[start[0] - i][start[1] + i].length !== 0){
                            return false;
                        }
                    }
                    return true;
                }
                if(start[1] > end[1]){
                    for(let i = 1; i < start[0] - end[0]; i++){
                        if(board[start[0] - i][start[1] - i].length !== 0){
                            return false;
                        }
                    }
                    return true;
                }
            }
        }
    }
    if(name === "King"){
        if(Math.abs(start[0] - end[0]) <= 1 && Math.abs(start[1] - end[1]) <= 1){
            return true;
        }
    }
    return false;
}


export default ChessLogic;