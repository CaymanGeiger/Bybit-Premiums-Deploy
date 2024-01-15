// / IMPORTS FOR SERVER (I INCLUDED DESCRIPTIONS FOR EACH FUNCITON!!)
const express = require('express');
// require('dotenv').config();
// const cors = require('cors');
const cron = require('node-cron');
// const next = require('next');
// const morgan = require('morgan');
const prisma = require('./lib/prisma');
const util = require('util');

let PQueue;

        const testData =
            [{
                month: 0.35743795,
                'one day': 0.4703143,
                coin: 'EQOUSDTGGGGTWASE4',
                'coin id': 1872363,
                'three days': 0.805499838,
                'three months': 9,
                week: 0.6697941
            },
            {
                month: 0.21500107,
                'one day': 0.672144,
                coin: 'CFKUSDTGGGGTWASE4',
                'coin id': 1162363,
                'three days': 0.591818977,
                'three months': 9,
                week: null
            },
            {
                month: 0.78573547,
                'one day': 0.4307549,
                coin: 'NWSUSDTGGGGTWASE4',
                'coin id': 1982363,
                'three days': 0.491935873,
                'three months': 9,
                week: 0.29510518
            },
            {
                month: 0.16631783,
                'one day': 0.7703422,
                coin: 'VSIUSDTGGGGTWASE4',
                'coin id': 1642363,
                'three days': 0.140050335,
                'three months': 9,
                week: 0.12202607
            },
            {
                month: 0.36509659,
                'one day': 0.7001823,
                coin: 'PAGUSDTGGGGTWASE4',
                'coin id': 1532363,
                'three days': 0.731306104,
                'three months': 9,
                week: null
            },
            {
                month: 0.35743795,
                'one day': 0.4703143,
                coin: 'EQOUSDTGGGGTWASE4',
                'coin id': 1872363,
                'three days': 0.805499838,
                'three months': 9,
                week: 0.6697941
            },
            {
                month: 0.21500107,
                'one day': 0.672144,
                coin: 'CFKUSDTGGGGTWASE4',
                'coin id': 1162363,
                'three days': 0.591818977,
                'three months': 9,
                week: null
            },
            {
                month: 0.78573547,
                'one day': 0.4307549,
                coin: 'NWSUSDTGGGGTWASE4',
                'coin id': 1982363,
                'three days': 0.491935873,
                'three months': 9,
                week: 0.29510518
            },
            {
                month: 0.16631783,
                'one day': 0.7703422,
                coin: 'VSIUSDTGGGGTWASE4',
                'coin id': 1642363,
                'three days': 0.140050335,
                'three months': 9,
                week: 0.12202607
            },
            {
                month: 0.36509659,
                'one day': 0.7001823,
                coin: 'PAGUSDTGGGGTWASE4',
                'coin id': 1532363,
                'three days': 0.731306104,
                'three months': 9,
                week: null
            },
            {
                month: 0.35743795,
                'one day': 0.4703143,
                coin: 'EQOUSDTGGGGTWASE4',
                'coin id': 1872363,
                'three days': 0.805499838,
                'three months': 9,
                week: 0.6697941
            },
            {
                month: 0.21500107,
                'one day': 0.672144,
                coin: 'CFKUSDTGGGGTWASE4',
                'coin id': 1162363,
                'three days': 0.591818977,
                'three months': 9,
                week: null
            },
            {
                month: 0.78573547,
                'one day': 0.4307549,
                coin: 'NWSUSDTGGGGTWASE4',
                'coin id': 1982363,
                'three days': 0.491935873,
                'three months': 9,
                week: 0.29510518
            },
            {
                month: 0.16631783,
                'one day': 0.7703422,
                coin: 'VSIUSDTGGGGTWASE4',
                'coin id': 1642363,
                'three days': 0.140050335,
                'three months': 9,
                week: 0.12202607
            },
            {
                month: 0.36509659,
                'one day': 0.7001823,
                coin: 'PAGUSDTGGGGTWASE4',
                'coin id': 1532363,
                'three days': 0.731306104,
                'three months': 9,
                week: null
            },
            {
                month: 0.35743795,
                'one day': 0.4703143,
                coin: 'EQOUSDTGGGGTWASE4',
                'coin id': 1872363,
                'three days': 0.805499838,
                'three months': 9,
                week: 0.6697941
            },
            {
                month: 0.21500107,
                'one day': 0.672144,
                coin: 'CFKUSDTGGGGTWASE4',
                'coin id': 1162363,
                'three days': 0.591818977,
                'three months': 9,
                week: null
            },
            {
                month: 0.78573547,
                'one day': 0.4307549,
                coin: 'NWSUSDTGGGGTWASE4',
                'coin id': 1982363,
                'three days': 0.491935873,
                'three months': 9,
                week: 0.29510518
            },
            {
                month: 0.16631783,
                'one day': 0.7703422,
                coin: 'VSIUSDTGGGGTWASE4',
                'coin id': 1642363,
                'three days': 0.140050335,
                'three months': 9,
                week: 0.12202607
            },
            {
                month: 0.36509659,
                'one day': 0.7001823,
                coin: 'PAGUSDTGGGGTWASE4',
                'coin id': 1532363,
                'three days': 0.731306104,
                'three months': 9,
                week: null
            },
            {
                month: 0.35743795,
                'one day': 0.4703143,
                coin: 'EQOUSDTGGGGTWASE4',
                'coin id': 1872363,
                'three days': 0.805499838,
                'three months': 9,
                week: 0.6697941
            },
            {
                month: 0.21500107,
                'one day': 0.672144,
                coin: 'CFKUSDTGGGGTWASE4',
                'coin id': 1162363,
                'three days': 0.591818977,
                'three months': 9,
                week: null
            },
            {
                month: 0.78573547,
                'one day': 0.4307549,
                coin: 'NWSUSDTGGGGTWASE4',
                'coin id': 1982363,
                'three days': 0.491935873,
                'three months': 9,
                week: 0.29510518
            },
            {
                month: 0.16631783,
                'one day': 0.7703422,
                coin: 'VSIUSDTGGGGTWASE4',
                'coin id': 1642363,
                'three days': 0.140050335,
                'three months': 9,
                week: 0.12202607
            },
            {
                month: 0.36509659,
                'one day': 0.7001823,
                coin: 'PAGUSDTGGGGTWASE4',
                'coin id': 1532363,
                'three days': 0.731306104,
                'three months': 9,
                week: null
            },
            {
                month: 0.35743795,
                'one day': 0.4703143,
                coin: 'EQOUSDTGGGGTWASE4',
                'coin id': 1872363,
                'three days': 0.805499838,
                'three months': 9,
                week: 0.6697941
            },
            {
                month: 0.21500107,
                'one day': 0.672144,
                coin: 'CFKUSDTGGGGTWASE4',
                'coin id': 1162363,
                'three days': 0.591818977,
                'three months': 9,
                week: null
            },
            {
                month: 0.78573547,
                'one day': 0.4307549,
                coin: 'NWSUSDTGGGGTWASE4',
                'coin id': 1982363,
                'three days': 0.491935873,
                'three months': 9,
                week: 0.29510518
            },
            {
                month: 0.16631783,
                'one day': 0.7703422,
                coin: 'VSIUSDTGGGGTWASE4',
                'coin id': 1642363,
                'three days': 0.140050335,
                'three months': 9,
                week: 0.12202607
            },
            {
                month: 0.36509659,
                'one day': 0.7001823,
                coin: 'PAGUSDTGGGGTWASE4',
                'coin id': 1532363,
                'three days': 0.731306104,
                'three months': 9,
                week: null
            },
            {
                month: 0.35743795,
                'one day': 0.4703143,
                coin: 'EQOUSDTGGGGTWASE4',
                'coin id': 1872363,
                'three days': 0.805499838,
                'three months': 9,
                week: 0.6697941
            },
            {
                month: 0.21500107,
                'one day': 0.672144,
                coin: 'CFKUSDTGGGGTWASE4',
                'coin id': 1162363,
                'three days': 0.591818977,
                'three months': 9,
                week: null
            },
            {
                month: 0.78573547,
                'one day': 0.4307549,
                coin: 'NWSUSDTGGGGTWASE4',
                'coin id': 1982363,
                'three days': 0.491935873,
                'three months': 9,
                week: 0.29510518
            },
            {
                month: 0.16631783,
                'one day': 0.7703422,
                coin: 'VSIUSDTGGGGTWASE4',
                'coin id': 1642363,
                'three days': 0.140050335,
                'three months': 9,
                week: 0.12202607
            },
            {
                month: 0.36509659,
                'one day': 0.7001823,
                coin: 'PAGUSDTGGGGTWASE4',
                'coin id': 1532363,
                'three days': 0.731306104,
                'three months': 9,
                week: null
            },
            {
                month: 0.35743795,
                'one day': 0.4703143,
                coin: 'EQOUSDTGGGGTWASE4',
                'coin id': 1872363,
                'three days': 0.805499838,
                'three months': 9,
                week: 0.6697941
            },
            {
                month: 0.21500107,
                'one day': 0.672144,
                coin: 'CFKUSDTGGGGTWASE4',
                'coin id': 1162363,
                'three days': 0.591818977,
                'three months': 9,
                week: null
            },
            {
                month: 0.78573547,
                'one day': 0.4307549,
                coin: 'NWSUSDTGGGGTWASE4',
                'coin id': 1982363,
                'three days': 0.491935873,
                'three months': 9,
                week: 0.29510518
            },
            {
                month: 0.16631783,
                'one day': 0.7703422,
                coin: 'VSIUSDTGGGGTWASE4',
                'coin id': 1642363,
                'three days': 0.140050335,
                'three months': 9,
                week: 0.12202607
            },
            {
                month: 0.36509659,
                'one day': 0.7001823,
                coin: 'PAGUSDTGGGGTWASE4',
                'coin id': 1532363,
                'three days': 0.731306104,
                'three months': 9,
                week: null
            },
            {
                month: 0.35743795,
                'one day': 0.4703143,
                coin: 'EQOUSDTGGGGTWASE4',
                'coin id': 1872363,
                'three days': 0.805499838,
                'three months': 9,
                week: 0.6697941
            },
            {
                month: 0.21500107,
                'one day': 0.672144,
                coin: 'CFKUSDTGGGGTWASE4',
                'coin id': 1162363,
                'three days': 0.591818977,
                'three months': 9,
                week: null
            },
            {
                month: 0.78573547,
                'one day': 0.4307549,
                coin: 'NWSUSDTGGGGTWASE4',
                'coin id': 1982363,
                'three days': 0.491935873,
                'three months': 9,
                week: 0.29510518
            },
            {
                month: 0.16631783,
                'one day': 0.7703422,
                coin: 'VSIUSDTGGGGTWASE4',
                'coin id': 1642363,
                'three days': 0.140050335,
                'three months': 9,
                week: 0.12202607
            },
            {
                month: 0.36509659,
                'one day': 0.7001823,
                coin: 'PAGUSDTGGGGTWASE4',
                'coin id': 1532363,
                'three days': 0.731306104,
                'three months': 9,
                week: null
            },
            {
                month: 0.35743795,
                'one day': 0.4703143,
                coin: 'EQOUSDTGGGGTWASE4',
                'coin id': 1872363,
                'three days': 0.805499838,
                'three months': 9,
                week: 0.6697941
            },
            {
                month: 0.21500107,
                'one day': 0.672144,
                coin: 'CFKUSDTGGGGTWASE4',
                'coin id': 1162363,
                'three days': 0.591818977,
                'three months': 9,
                week: null
            },
            {
                month: 0.78573547,
                'one day': 0.4307549,
                coin: 'NWSUSDTGGGGTWASE4',
                'coin id': 1982363,
                'three days': 0.491935873,
                'three months': 9,
                week: 0.29510518
            },
            {
                month: 0.16631783,
                'one day': 0.7703422,
                coin: 'VSIUSDTGGGGTWASE4',
                'coin id': 1642363,
                'three days': 0.140050335,
                'three months': 9,
                week: 0.12202607
            },
            {
                month: 0.36509659,
                'one day': 0.7001823,
                coin: 'PAGUSDTGGGGTWASE4',
                'coin id': 1532363,
                'three days': 0.731306104,
                'three months': 9,
                week: null
            },
            {
                month: 0.35743795,
                'one day': 0.4703143,
                coin: 'EQOUSDTGGGGTWASE4',
                'coin id': 1872363,
                'three days': 0.805499838,
                'three months': 9,
                week: 0.6697941
            },
            {
                month: 0.21500107,
                'one day': 0.672144,
                coin: 'CFKUSDTGGGGTWASE4',
                'coin id': 1162363,
                'three days': 0.591818977,
                'three months': 9,
                week: null
            },
            {
                month: 0.78573547,
                'one day': 0.4307549,
                coin: 'NWSUSDTGGGGTWASE4',
                'coin id': 1982363,
                'three days': 0.491935873,
                'three months': 9,
                week: 0.29510518
            },
            {
                month: 0.16631783,
                'one day': 0.7703422,
                coin: 'VSIUSDTGGGGTWASE4',
                'coin id': 1642363,
                'three days': 0.140050335,
                'three months': 9,
                week: 0.12202607
            },
            {
                month: 0.36509659,
                'one day': 0.7001823,
                coin: 'PAGUSDTGGGGTWASE4',
                'coin id': 1532363,
                'three days': 0.731306104,
                'three months': 9,
                week: null
            },
            {
                month: 0.35743795,
                'one day': 0.4703143,
                coin: 'EQOUSDTGGGGTWASE4',
                'coin id': 1872363,
                'three days': 0.805499838,
                'three months': 9,
                week: 0.6697941
            },
            {
                month: 0.21500107,
                'one day': 0.672144,
                coin: 'CFKUSDTGGGGTWASE4',
                'coin id': 1162363,
                'three days': 0.591818977,
                'three months': 9,
                week: null
            },
            {
                month: 0.78573547,
                'one day': 0.4307549,
                coin: 'NWSUSDTGGGGTWASE4',
                'coin id': 1982363,
                'three days': 0.491935873,
                'three months': 9,
                week: 0.29510518
            },
            {
                month: 0.16631783,
                'one day': 0.7703422,
                coin: 'VSIUSDTGGGGTWASE4',
                'coin id': 1642363,
                'three days': 0.140050335,
                'three months': 9,
                week: 0.12202607
            },
            {
                month: 0.36509659,
                'one day': 0.7001823,
                coin: 'PAGUSDTGGGGTWASE4',
                'coin id': 1532363,
                'three days': 0.731306104,
                'three months': 9,
                week: null
            },
            {
                month: 0.35743795,
                'one day': 0.4703143,
                coin: 'EQOUSDTGGGGTWASE4',
                'coin id': 1872363,
                'three days': 0.805499838,
                'three months': 9,
                week: 0.6697941
            },
            {
                month: 0.21500107,
                'one day': 0.672144,
                coin: 'CFKUSDTGGGGTWASE4',
                'coin id': 1162363,
                'three days': 0.591818977,
                'three months': 9,
                week: null
            },
            {
                month: 0.78573547,
                'one day': 0.4307549,
                coin: 'NWSUSDTGGGGTWASE4',
                'coin id': 1982363,
                'three days': 0.491935873,
                'three months': 9,
                week: 0.29510518
            },
            {
                month: 0.16631783,
                'one day': 0.7703422,
                coin: 'VSIUSDTGGGGTWASE4',
                'coin id': 1642363,
                'three days': 0.140050335,
                'three months': 9,
                week: 0.12202607
            },
            {
                month: 0.36509659,
                'one day': 0.7001823,
                coin: 'PAGUSDTGGGGTWASE4',
                'coin id': 1532363,
                'three days': 0.731306104,
                'three months': 9,
                week: null
            },
            {
                month: 0.35743795,
                'one day': 0.4703143,
                coin: 'EQOUSDTGGGGTWASE4',
                'coin id': 1872363,
                'three days': 0.805499838,
                'three months': 9,
                week: 0.6697941
            },
            {
                month: 0.21500107,
                'one day': 0.672144,
                coin: 'CFKUSDTGGGGTWASE4',
                'coin id': 1162363,
                'three days': 0.591818977,
                'three months': 9,
                week: null
            },
            {
                month: 0.78573547,
                'one day': 0.4307549,
                coin: 'NWSUSDTGGGGTWASE4',
                'coin id': 1982363,
                'three days': 0.491935873,
                'three months': 9,
                week: 0.29510518
            },
            {
                month: 0.16631783,
                'one day': 0.7703422,
                coin: 'VSIUSDTGGGGTWASE4',
                'coin id': 1642363,
                'three days': 0.140050335,
                'three months': 9,
                week: 0.12202607
            },
            {
                month: 0.36509659,
                'one day': 0.7001823,
                coin: 'PAGUSDTGGGGTWASE4',
                'coin id': 1532363,
                'three days': 0.731306104,
                'three months': 9,
                week: null
            },
            {
                month: 0.35743795,
                'one day': 0.4703143,
                coin: 'EQOUSDTGGGGTWASE4',
                'coin id': 1872363,
                'three days': 0.805499838,
                'three months': 9,
                week: 0.6697941
            },
            {
                month: 0.21500107,
                'one day': 0.672144,
                coin: 'CFKUSDTGGGGTWASE4',
                'coin id': 1162363,
                'three days': 0.591818977,
                'three months': 9,
                week: null
            },
            {
                month: 0.78573547,
                'one day': 0.4307549,
                coin: 'NWSUSDTGGGGTWASE4',
                'coin id': 1982363,
                'three days': 0.491935873,
                'three months': 9,
                week: 0.29510518
            },
            {
                month: 0.16631783,
                'one day': 0.7703422,
                coin: 'VSIUSDTGGGGTWASE4',
                'coin id': 1642363,
                'three days': 0.140050335,
                'three months': 9,
                week: 0.12202607
            },
            {
                month: 0.36509659,
                'one day': 0.7001823,
                coin: 'PAGUSDTGGGGTWASE4',
                'coin id': 1532363,
                'three days': 0.731306104,
                'three months': 9,
                week: null
            },
            {
                month: 0.35743795,
                'one day': 0.4703143,
                coin: 'EQOUSDTGGGGTWASE4',
                'coin id': 1872363,
                'three days': 0.805499838,
                'three months': 9,
                week: 0.6697941
            },
            {
                month: 0.21500107,
                'one day': 0.672144,
                coin: 'CFKUSDTGGGGTWASE4',
                'coin id': 1162363,
                'three days': 0.591818977,
                'three months': 9,
                week: null
            },
            {
                month: 0.78573547,
                'one day': 0.4307549,
                coin: 'NWSUSDTGGGGTWASE4',
                'coin id': 1982363,
                'three days': 0.491935873,
                'three months': 9,
                week: 0.29510518
            },
            {
                month: 0.16631783,
                'one day': 0.7703422,
                coin: 'VSIUSDTGGGGTWASE4',
                'coin id': 1642363,
                'three days': 0.140050335,
                'three months': 9,
                week: 0.12202607
            },
            {
                month: 0.36509659,
                'one day': 0.7001823,
                coin: 'PAGUSDTGGGGTWASE4',
                'coin id': 1532363,
                'three days': 0.731306104,
                'three months': 9,
                week: null
            },
            {
                month: 0.35743795,
                'one day': 0.4703143,
                coin: 'EQOUSDTGGGGTWASE4',
                'coin id': 1872363,
                'three days': 0.805499838,
                'three months': 9,
                week: 0.6697941
            },
            {
                month: 0.21500107,
                'one day': 0.672144,
                coin: 'CFKUSDTGGGGTWASE4',
                'coin id': 1162363,
                'three days': 0.591818977,
                'three months': 9,
                week: null
            },
            {
                month: 0.78573547,
                'one day': 0.4307549,
                coin: 'NWSUSDTGGGGTWASE4',
                'coin id': 1982363,
                'three days': 0.491935873,
                'three months': 9,
                week: 0.29510518
            },
            {
                month: 0.16631783,
                'one day': 0.7703422,
                coin: 'VSIUSDTGGGGTWASE4',
                'coin id': 1642363,
                'three days': 0.140050335,
                'three months': 9,
                week: 0.12202607
            },
            {
                month: 0.36509659,
                'one day': 0.7001823,
                coin: 'PAGUSDTGGGGTWASE4',
                'coin id': 1532363,
                'three days': 0.731306104,
                'three months': 9,
                week: null
            },
            {
                month: 0.35743795,
                'one day': 0.4703143,
                coin: 'EQOUSDTGGGGTWASE4',
                'coin id': 1872363,
                'three days': 0.805499838,
                'three months': 9,
                week: 0.6697941
            },
            {
                month: 0.21500107,
                'one day': 0.672144,
                coin: 'CFKUSDTGGGGTWASE4',
                'coin id': 1162363,
                'three days': 0.591818977,
                'three months': 9,
                week: null
            },
            {
                month: 0.78573547,
                'one day': 0.4307549,
                coin: 'NWSUSDTGGGGTWASE4',
                'coin id': 1982363,
                'three days': 0.491935873,
                'three months': 9,
                week: 0.29510518
            },
            {
                month: 0.16631783,
                'one day': 0.7703422,
                coin: 'VSIUSDTGGGGTWASE4',
                'coin id': 1642363,
                'three days': 0.140050335,
                'three months': 9,
                week: 0.12202607
            },
            {
                month: 0.36509659,
                'one day': 0.7001823,
                coin: 'PAGUSDTGGGGTWASE4',
                'coin id': 1532363,
                'three days': 0.731306104,
                'three months': 9,
                week: null
            },
            {
                month: 0.35743795,
                'one day': 0.4703143,
                coin: 'EQOUSDTGGGGTWASE4',
                'coin id': 1872363,
                'three days': 0.805499838,
                'three months': 9,
                week: 0.6697941
            },
            {
                month: 0.21500107,
                'one day': 0.672144,
                coin: 'CFKUSDTGGGGTWASE4',
                'coin id': 1162363,
                'three days': 0.591818977,
                'three months': 9,
                week: null
            },
            {
                month: 0.78573547,
                'one day': 0.4307549,
                coin: 'NWSUSDTGGGGTWASE4',
                'coin id': 1982363,
                'three days': 0.491935873,
                'three months': 9,
                week: 0.29510518
            },
            {
                month: 0.16631783,
                'one day': 0.7703422,
                coin: 'VSIUSDTGGGGTWASE4',
                'coin id': 1642363,
                'three days': 0.140050335,
                'three months': 9,
                week: 0.12202607
            },
            {
                month: 0.36509659,
                'one day': 0.7001823,
                coin: 'PAGUSDTGGGGTWASE4',
                'coin id': 1532363,
                'three days': 0.731306104,
                'three months': 9,
                week: null
            }]

async function loadPQueue() {
    PQueue = (await import('p-queue')).default;
}

loadPQueue();

// const { default: test } = require('node:test');

// TO SET UP THE SERVER
const app = express();
const port = process.env.PORT || 3001;
// app.use(cors());



// app.use(morgan('combined'));


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})


app.get('/api/test', (req, res) => {
    res.send("TESTING")
    try {
        createOrUpdateBorrowData(testData);
    } catch(error) {
        res.send("Issue Found", error)
    }
});


module.exports = app


// ------------------------------------------------------------------------------------------------------------

// EVERY 10-15 MINUTE SCHEDULER*
// REMOVE ONE * TO MAKE IT RUN ON MINUTES AGAIN 3 * * * * * MEANS EVERY 3 SECONDS
cron.schedule('0 0 0,8,16 * * *', () => {
    console.log('Fetching and updating data every 10 minutes');

    // const testFetch = async () => {
    // const response = await fetch('http://localhost:3001/api/bybitfunding');

    // const data = await response.json();
    // }
    // testFetch();
    // fetchFundingRateData();
    // fetchFundingRateData();
});


cron.schedule('*/15 * * * * *', () => {
    // fetchFundingRateData();
    console.log("Server Is Working!!")
})






let newList = [];
let started = "stage0"
const createOrUpdateBorrowData = async (borrowData) => {
    if (!Array.isArray(borrowData)) {
        console.error("Expected borrowData to be an array.");
        return;
    }
    newList = borrowData;
    started = "stage1"
    console.log("Updating/Creating Borrow Rates Now....");
    let borrowCurrentItemIndex = 0;
    let stopBorrowProcessing = false;
    console.log("working")
    const coinIds = [...new Set(Object.values(borrowData).flat().map(item => item['coin id']).filter(id => id !== undefined))];
    const existingRecords = await prisma.coinBorrowRate.findMany({
        where: { coinId: { in: coinIds } }
    });
    const recordsMap = new Map(existingRecords.map(record => [record.coinId, record]));
    for (const item of borrowData) {
        console.log("Processing item", item);
        await delay(1000);
        processBorrowItem(item, recordsMap);
        if (borrowCurrentItemIndex === borrowData.length - 1) {
            stopBorrowProcessing = true;
            break;
        }
        if (stopBorrowProcessing) {
            break;
        }
    }
    borrowCurrentItemIndex = 0;
    stopBorrowProcessing = false;
    console.log("Borrow Update/Create Complete.");
    // filterOutBorrowUSDT();
}

// let newList = [];
// let started = "stage0"
// const createOrUpdateBorrowData = async (borrowData) => {
//     if (!Array.isArray(borrowData)) {
//         console.error("Expected borrowData to be an array.");
//         return;
//     }
//     newList = borrowData;
//     started = "stage1"
//     console.log("Updating/Creating Borrow Rates Now....");
//     const queue = new PQueue({ concurrency: 5 });
//     let borrowCurrentItemIndex = 0;
//     let stopBorrowProcessing = false;
//     console.log("working")
//     const coinIds = [...new Set(Object.values(borrowData).flat().map(item => item['coin id']).filter(id => id !== undefined))];
//     const existingRecords = await prisma.coinBorrowRate.findMany({
//         where: { coinId: { in: coinIds } }
//     });
//     const recordsMap = new Map(existingRecords.map(record => [record.coinId, record]));
//     console.log(borrowData)
//     console.log(borrowData);
//     for (const item of borrowData) {
//         console.log("Processing item", item);
//         queue.add(() => processBorrowItem(item, recordsMap));
//         if (borrowCurrentItemIndex === borrowData.length - 1) {
//             stopBorrowProcessing = true;
//             break;
//         }
//         if (stopBorrowProcessing) {
//             break;
//         }
//     }
//     await queue.onIdle();
//     borrowCurrentItemIndex = 0;
//     stopBorrowProcessing = false;
//     console.log("Borrow Update/Create Complete.");
//     // filterOutBorrowUSDT();
// }

function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}


let borrowCompleted = 0;
const processBorrowItem = async (item, recordsMap) => {
    let coinTrim = item.coin.trim();
    await delay(2000);
    const existingRecord = recordsMap.get(item['coin id']);
    // const itemResponse = await fetch(`https://api.bybit.com/v5/market/tickers?category=spot&symbol=${coinTrim}USDT`);
    // const itemData = await itemResponse.json();

    if (existingRecord) {
        try {
            await prisma.coinBorrowRate.create({
                data: {
                    coinId: item && item['coin id'] || null,
                    name: item && coinTrim || null,
                    oneDayAverage: item && item['one day'] || null,
                    threeDayAverage: item && item['three days'] || null,
                    sevenDayAverage: item && item.week || null,
                    thirtyDayAverage: item && item.month || null,
                    ninetyDayAverage: 6 || null,
                }
            });
        } catch(error){
            console.error("An error occurred while creating a record:", error);

        }
        // try {
        //     const nestedItemData = itemData.result.list[0];
        //     await prisma.coinBorrowRate.update({
        //         where: updateCondition,
        //         data: {
        //             spotVolume: nestedItemData && parseFloat(nestedItemData.turnover24h) || null,
        //         }
        //     });
        // } catch (e) {
        //     console.error("issue", e);
        // }
    } else {
        try {
            await prisma.coinBorrowRate.create({
                data: {
                    coinId: item && item['coin id'] || null,
                    name: item && coinTrim || null,
                    oneDayAverage: item && item['one day'] || null,
                    threeDayAverage: item && item['three days'] || null,
                    sevenDayAverage: item && item.week || null,
                    thirtyDayAverage: item && item.month || null,
                    ninetyDayAverage: 6 || null,
                }
            });
            // try {
            //     const nestedItemData = itemData.result.list[0];
            //     await prisma.coinBorrowRate.update({
            //         where: updateCondition,
            //         data: {
            //             spotVolume: nestedItemData && parseFloat(nestedItemData.turnover24h) || null,
            //         }
            //     })
            // } catch (e) {
            //     console.error("issue", e);
            // };
        } catch (error) {
            console.error("An error occurred while creating a record:", error);
        }
    };
    borrowCompleted += 1;
    console.log("BORROW WRITE WAS COMPLETED", borrowCompleted);
}




















// SYMBOL ID IS THE JSON FOR FUNDING COIN ID IS THE JSON FOR BORROW
// CREATE OR UPDATE FOR FUNDING



const createOrUpdateFundingData = async (fundingData) => {
    console.log("Updating/Creating Borrow Rates Now....");

    const queue = new PQueue({ concurrency: 5 });
    let fundingCurrentItemIndex = 0;
    let stopFundingProcessing = false;

    const coinIds = [...new Set(Object.values(fundingData).flat().map(item => item['symbol id']).filter(id => id !== undefined))];
    const existingRecords = await prisma.coinFundingRate.findMany({
        where: { coinId: { in: coinIds } }
    });
    const recordsMap = new Map(existingRecords.map(record => [record.coinId, record]));

    for (const key in fundingData) {
        if (fundingData.hasOwnProperty(key)) {
            let itemsArray = fundingData[key];

            if (Array.isArray(itemsArray)) {
                for (const item of itemsArray) {
                    queue.add(() => processFundingItem(item, recordsMap));
                    fundingCurrentItemIndex++;
                    if (fundingCurrentItemIndex === fundingData.length - 1) {
                        stopFundingProcessing = true;
                        break;
                    }
                }
                if (stopFundingProcessing) {
                    break;
                }
            } else {
                console.error(`Expected an array for key ${key}, but received:`, fundingData);
            }
        }
    }
    await queue.onIdle();
    fundingCurrentItemIndex = 0;
    stopFundingProcessing = false;
    console.log("Funding Update/Create Complete, Getting Funding Logos Now...");
    filterOutFundingUSDT();
}




function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

let fundingCompleted = 0;
const processFundingItem = async (item, recordsMap) => {
    await delay(1200);

    const coinTrimmed = item.symbol.trim()
    const existingRecord = recordsMap.get(item['symbol id']);
    const itemResponse = await fetch(`https://api.bybit.com/v5/market/tickers?category=linear&symbol=${coinTrimmed}`);
    const itemData = await itemResponse.json();
    const nestedItemData = itemData.result.list[0];

    const datePatterns = [
        "20OCT23", "13OCT23", "15DEC23", "28JUN24",
        "26JAN24", "28JUN24", "15DEC23", "29SEP23",
        "29MAR24", "06OCT23", "29DEC23", "22SEP23",
        "27OCT23", "24NOV23"
    ];

    console.log(nestedItemData)
    let endsWithPerp = coinTrimmed.endsWith('PERP');
    let includesDate = datePatterns.some(date => coinTrimmed.includes(date));

    if (!endsWithPerp && !includesDate) {
        // Update database with the fetched data
        if (existingRecord) {
            await prisma.coinFundingRate.update({
                where: { coinId: item['symbol id'] },
                data: {
                    coinId: item && item['symbol id'] || null,
                    name: item && coinTrimmed || null,
                    oneDayAverage: item && item['one day'] || null,
                    threeDayAverage: item && item['three days'] || null,
                    sevenDayAverage: item && item.week || null,
                    thirtyDayAverage: item && item.month || null,
                    ninetyDayAverage: item && item['three months'] || null,
                }
            });
            await prisma.coinFundingRate.update({
                where: { coinId: item['symbol id'] },
                data: {
                    twentyFourHourVolume: nestedItemData && parseFloat(nestedItemData.turnover24h) || null,
                }
            });
        } else {
            try {
                await prisma.coinFundingRate.create({
                    data: {
                        coinId: item && item['symbol id'] || null,
                        name: item && coinTrimmed || null,
                        oneDayAverage: item && item['one day'] || null,
                        threeDayAverage: item && item['three days'] || null,
                        sevenDayAverage: item && item.week || null,
                        thirtyDayAverage: item && item.month || null,
                        ninetyDayAverage: item && item['three months'] || null,
                    }
                });

                await prisma.coinFundingRate.update({
                    where: { coinId: item['symbol id'] },
                    data: {
                        twentyFourHourVolume: nestedItemData && parseFloat(nestedItemData.turnover24h) || null,
                    }
                });
            } catch (error) {
                console.error("An error occurred while creating a record:", error);
            }
        };
    }
    fundingCompleted += 1
    console.log("FUNDING WRITE WAS COMPLETED", fundingCompleted)
}



// THIS FETCHES THE DATA FOR FUNDING API AT BOTTOM OF PAGE AND UPDATES IT AND CALLS TO THE FUNCTIONS ABOVE TO UPDATE THE DATA
const fetchFundingRateData = async () => {
    console.log("Fetching Funding Rates Now...")
    try {
        const fundingResponse = await fetch('http://localhost:3001/api/bybitfunding');

        if (!fundingResponse.ok) {
            throw new Error('Failed to fetch data');
        } else {
            const fundingData = await fundingResponse.json();
            createOrUpdateFundingData(fundingData);

        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};
// fetchFundingRateData();



const lookForNullNames = async () => {
    const noNames = await prisma.coinFundingRate.findMany({
        where: {
            coinId: null
        }
    });
}
// lookForNullNames();






// ONLY FUNDING FETCH
app.get('/api/bybitfunding', async (req, res) => {
    const apiKey = process.env.API_KEY;
    const apiSecret = process.env.API_SECRET;

    if (!apiKey || !apiSecret) {
        console.error('API key or secret is undefined');
        res.status(400).json({ error: 'API key or secret is missing' });
        return;
    }
    try {
        const fundingResponse = await fetch('https://bybit-premiums-api.onrender.com/funding-rate', {
            headers: {
                'apikey': apiKey,
                'secret': apiSecret
            }
        });

        if (!fundingResponse.ok) {
            throw new Error(`HTTP error! status: ${fundingResponse.status}`);
        }

        const fundingData = await fundingResponse.json();
        res.json(fundingData);
        return;
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});






let allCurrentFundingRates = [];
const filterOutFundingUSDT = async () => {
    console.log("Getting Funding Rate Logos Now...")
    // This gets all logos without logos
    const allFundingRatesWithEmptySymbolUrl = await prisma.coinFundingRate.findMany({
        where: {
            symbolUrl: null
        }
    });
    // This flattens the array
    allCurrentFundingRates = allFundingRatesWithEmptySymbolUrl.flat();
    // This is the patterns that we want to remove from the names
    const removalPatterns = ["100000000", "10000000", "1000000", "100000", "10000", "1000"];

    // This trims the names and removes the patterns from the names
    const trimmedRates = allCurrentFundingRates.map(item => {
        if (item.name === null) {
            return null;
        } else {
            // Remove the USDT from the name and trim the name
            let modifiedNameCMC = item.name.trim().replace('USDT', '');
            let modifiedName = item.name.trim();

            // Remove each pattern from the name
            removalPatterns.forEach(pattern => {
                // Ensure that we're matching whole patterns
                if (modifiedName.includes(pattern)) {
                    const regex = new RegExp(pattern, 'g');
                    modifiedName = modifiedName.replace(regex, '');
                }
            });

            // Return the new name and the old name (New name is needed for the api call)
            return {
                coinId: item.coinId,
                name: modifiedName,
                nameCMC: modifiedNameCMC
            };
        };
    });

    // Loop through the array and call the function below
    for (let item of trimmedRates) {
        if (item) {
            await delay(1000);
            await getFundingRateLogos(item);
        }
    }
    console.log("Funding Logos Updated, Starting Borrow Rates Now...");
    // fetchBorrowRateData();
};






// filterOutFundingUSDT();
// This fetches the logo from the api and updates the table
const getFundingRateLogos = async (item, maxRetries = 5) => {
    let retryCount = 0;

    // Loop through the api call 5 times
    while (retryCount < maxRetries) {
        const response = await fetch(
            `https://pro-api.coinmarketcap.com/v2/cryptocurrency/info?symbol=${item.nameCMC}`, {
            headers: {
                'X-CMC_PRO_API_KEY': '1724b6fb-77df-4339-98c1-6f8f43eb609a'
            }
        });
        const data = await response.json();

        // Check if the api call failed and log the coin name
        if (data.status && data.status.error_message && data.status.error_message.includes("Invalid value")) {
            console.log("Invalid value for:", item.nameCMC);
            return;
        }
        if (response.ok) {
            let updateCondition = {};

            // Check if the coinId exists and set the update condition
            // (coinId is the primary key) (name is the secondary key)
            if (item.coinId) {
                updateCondition.coinId = item.coinId;
            } else if (item.name) {
                updateCondition.name = item.name;
            } updateCondition.name = item.name;

            let logoUrl = data && data.data && item.nameCMC && data.data[item.nameCMC] && data.data[item.nameCMC][0] && data.data[item.nameCMC][0].logo;

            // Check if the logo exists and update the table
            if (logoUrl) {
                await prisma.coinFundingRate.update({
                    where: updateCondition,
                    data: {
                        nameCMC: item.nameCMC,
                        symbolUrl: logoUrl,
                    }
                });
                console.log("Logo updated for:", item.nameCMC);
                return true;
            }
            // Return false if the logo doesn't exist
            return false;

            // Log the error if the api call fails
        } else {
            console.error('Fetch failed:', response.statusText);
            retryCount++;

            // Wait 1 minute if the api call fails and try again
            if (retryCount >= maxRetries) {
                console.log(`Maximum retries reached. Waiting for 1 minute before continuing...`);
                await delay(60000);
                break;
            }
        }
    }

    // Log the coin name if the api call fails 5 times
    console.log("Failed after maximum retries for:", item.nameCMC);
    return false;
};






// CREATE OR UPDATE FOR BORROW?

// THIS FETCHES THE DATA FOR BORROW API AT BOTTOM OF PAGE AND UPDATES IT AND CALLS TO THE FUNCTIONS ABOVE TO UPDATE THE DATA
const fetchBorrowRateData = async () => {
    console.log("Fetching Borrow Rates Now...")
    try {
        const borrowResponse = await fetch('http://localhost:3001/api/bybitborrow');

        if (!borrowResponse.ok) {
            throw new Error('Failed to fetch data');
        } else {
            const borrowData = await borrowResponse.json();
            createOrUpdateBorrowData(borrowData);
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};
// fetchBorrowRateData();





// ONLY BORROW FETCH
app.get('/api/bybitborrow', async (req, res) => {
    const apiKey = process.env.API_KEY;
    const apiSecret = process.env.API_SECRET;

    if (!apiKey || !apiSecret) {
        console.error('API key or secret is undefined');
        res.status(400).json({ error: 'API key or secret is missing' });
        return;
    }
    try {
        const borrowResponse = await fetch('https://bybit-premiums-api.onrender.com/borrow-rate', {
            headers: {
                'apikey': apiKey,
                'secret': apiSecret
            }
        });

        if (!borrowResponse.ok) {
            throw new Error(`HTTP error! status: ${borrowResponse.status}`);
        }

        const borrowData = await borrowResponse.json();
        res.json(borrowData);
        return;
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});






// use the current name to get a usuable version for logo
// fetch to get the logo using the new name and push the url into the table
// mainTable => updateTable => fetchLogo => mainTable
let allCurrentBorrowRates = [];
const filterOutBorrowUSDT = async () => {
    console.log("Getting Borrow Rate Logos Now...")
    // This gets all logos without logos
    const allBorrowRatesWithEmptySymbolUrl = await prisma.coinBorrowRate.findMany({
        where: {
            symbolUrl: null
        }
    });
    // This flattens the array
    allCurrentBorrowRates = allBorrowRatesWithEmptySymbolUrl.flat();

    // These are the patterns that we want to remove from the names
    const removalPatterns = ["100000000", "10000000", "1000000", "100000", "10000", "1000"];

    // This trims the names and removes the patterns from the names
    const trimmedRates = allCurrentBorrowRates.map(item => {
        if (item.name === null) {
            return null;
        } else {
            // This removes the USDT from the name and trims the name
            let modifiedNameCMC = item.name.trim().replace('USDT', '');
            let modifiedName = item.name.trim();

            // Remove each pattern from the name
            removalPatterns.forEach(pattern => {
                if (modifiedName.includes(pattern)) {
                    const regex = new RegExp(pattern, 'g');
                    modifiedName = modifiedName.replace(regex, '');
                }
            });
            // This returns the new name and the old name
            // (New name is needed for the api call)
            return {
                coinId: item.coinId,
                name: modifiedName,
                nameCMC: modifiedNameCMC
            };
        }
    });

    // This loops through the array and calls the function below
    for (let item of trimmedRates) {
        if (item) {
            await delay(1000);
            await getBorrowRateLogos(item);
        }
    }
    console.log("Borrow Rate Logos Updated, END")
};
// filterOutBorrowUSDT();





// This fetches the logo from the api and updates the table
const getBorrowRateLogos = async (item, maxRetries = 5) => {
    let retryCount = 0;

    // This loops through the api call 5 times
    // (if it fails it waits 1 minute and tries again)
    // (if it fails 5 times it logs the coin name) The api has failed on some coins
    while (retryCount < maxRetries) {
        const response = await fetch(
            `https://pro-api.coinmarketcap.com/v2/cryptocurrency/info?symbol=${item.nameCMC}`, {
            headers: {
                'X-CMC_PRO_API_KEY': '1724b6fb-77df-4339-98c1-6f8f43eb609a'
            }
        });
        const data = await response.json();

        // This checks if the api call failed and logs the coin name
        if (data.status && data.status.error_message && data.status.error_message.includes("Invalid value")) {
            console.log("Invalid value for:", item.nameCMC);
            return;
        }
        if (response.ok) {
            let updateCondition = {};

            // This checks if the coinId exists and sets the update condition
            // (coinId is the primary key) (name is the secondary key)
            if (item.coinId) {
                updateCondition.coinId = item.coinId;
            } else if (item.name) {
                updateCondition.name = item.name;
            } updateCondition.name = item.name;

            let logoUrl = data && data.data && item.nameCMC && data.data[item.nameCMC] && data.data[item.nameCMC][0] && data.data[item.nameCMC][0].logo;

            // This checks if the logo exists and updates the table
            if (logoUrl) {
                await prisma.coinBorrowRate.update({
                    where: updateCondition,
                    data: {
                        nameCMC: item.nameCMC,
                        symbolUrl: logoUrl,
                    }
                });
                console.log("Logo updated for:", item.nameCMC);
                return true;
            }

            // This returns false if the logo doesn't exist
            return false;

        // This logs the error if the api call fails
        } else {
            console.error('Fetch failed:', response.statusText);
            retryCount++;

            // This waits 1 minute if the api call fails and tries again
            if (retryCount >= maxRetries) {
                console.log(`Maximum retries reached. Waiting for 1 minute before continuing...`);
                await delay(60000);
                break;
            }
        }
    }

    // This logs the coin name if the api call fails 5 times
    console.log("Failed after maximum retries for:", item.nameCMC);
    return false;
};






async function deleteDuplicateCoinFundingRates() {
    const duplicates = await prisma.$queryRaw`
        SELECT name
        FROM "CoinFundingRate"
        GROUP BY name
        HAVING COUNT(*) > 1
    `;

    for (const duplicate of duplicates) {
        const records = await prisma.coinFundingRate.findMany({
            where: { name: duplicate.name },
            orderBy: { id: 'asc' }
        });

        for (let i = 1; i < records.length; i++) {
            await prisma.coinFundingRate.delete({
                where: { id: records[i].id }
            });
        }
    }

    console.log('Duplicate records deleted');
}

// deleteDuplicateCoinFundingRates()
//     .catch(e => {
//         throw e;
//     })
//     .finally(async () => {
//         await prisma.$disconnect();
//     });





let currentTrimmedCount = 0;
async function trimCoinFundingRateNames() {
    // Fetch all records
    const allRates = await prisma.coinFundingRate.findMany();


    for (const rate of allRates) {
        const trimmedName = rate.name.trim();

        await prisma.coinFundingRate.update({
            where: { name: rate.name },
            data: { name: trimmedName }
        });
        currentTrimmedCount++
        console.log("TRIMMED", currentTrimmedCount)
    }

    console.log('All coin funding rate names have been trimmed');
}
// trimCoinFundingRateNames()





async function trimCoinBorrowRateNames() {
    // Fetch all records
    const allRates = await prisma.coinBorrowRate.findMany();

    for (const rate of allRates) {
        const trimmedName = rate.name.trim();

        await prisma.coinBorrowRate.update({
            where: { name: rate.name },
            data: { name: trimmedName }
        });
    }

    console.log('All coin borrow rate names have been trimmed');
}
// trimCoinBorrowRateNames()







async function deleteSpecificDateCoins() {
    const datePatterns = [
        "20OCT23", "13OCT23", "15DEC23", "28JUN24",
        "26JAN24", "28JUN24", "15DEC23", "29SEP23",
        "29MAR24", "06OCT23", "29DEC23", "22SEP23",
        "27OCT23", "24NOV23"
    ];

    for (const datePattern of datePatterns) {
        const coinsWithDate = await prisma.coinFundingRate.findMany({
            where: {
                name: {
                    contains: datePattern
                }
            }
        });

        for (const coin of coinsWithDate) {
            await prisma.coinFundingRate.delete({
                where: { id: coin.id }
            });
        }
    }
    // console.log('Coins with dates deleted, getting logos now...');
}

// deleteSpecificDateCoins().catch(e => {
//     throw e
// }).finally(async () => {
//     await prisma.$disconnect()
// });




async function deleteCoinsEndingWithPerp() {
    const coins = await prisma.coinFundingRate.findMany();

    const coinsEndingWithPerp = coins.filter(coin =>
        coin.name.trim().toUpperCase().endsWith('PERP')
    );

    for (const coin of coinsEndingWithPerp) {
        await prisma.coinFundingRate.delete({
            where: { id: coin.id }
        });
    }

    console.log('Coins ending with PERP have been deleted, getting funding rates now...');
    // fetchFundingRateData();
}

// deleteCoinsEndingWithPerp().catch(e => {
//     throw e
// }).finally(async () => {
//     await prisma.$disconnect()
// });



// fetchBorrowRateData();
